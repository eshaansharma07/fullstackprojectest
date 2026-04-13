import crypto from "crypto";
import { stringify } from "csv-stringify/sync";
import Event from "../models/Event.js";
import Category from "../models/Category.js";
import Registration from "../models/Registration.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import Feedback from "../models/Feedback.js";
import { sendSuccess, createError } from "../utils/apiResponse.js";
import { uploadBuffer } from "../utils/cloudinary.js";
import { buildEventFilters, parsePagination } from "../utils/query.js";

const organizerSelect = "name email role institute profilePicture";
const feedbackUserSelect = "name profilePicture";
const publicEventPopulate = [
  { path: "category" },
  { path: "organizer", select: organizerSelect }
];

const computeStatus = (startDate, endDate) => {
  const now = new Date();
  if (now > new Date(endDate)) return "completed";
  if (now >= new Date(startDate)) return "ongoing";
  return "upcoming";
};

const buildSlug = (title) =>
  `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${crypto.randomBytes(3).toString("hex")}`;

export const getPublicHomeData = async (_req, res) => {
  const [featuredEvents, trendingEvents, recentEvents, categories, stats, testimonials] = await Promise.all([
    Event.find({ approvalStatus: "approved" }).populate(publicEventPopulate).sort({ featured: -1, startDate: 1 }).limit(6),
    Event.find({ approvalStatus: "approved" }).populate(publicEventPopulate).sort({ trendingScore: -1, registrationCount: -1 }).limit(4),
    Event.find({ approvalStatus: "approved" }).populate(publicEventPopulate).sort({ createdAt: -1 }).limit(4),
    Category.find().sort({ name: 1 }),
    Promise.all([
      Event.countDocuments({ approvalStatus: "approved" }),
      Registration.countDocuments({ status: { $in: ["registered", "attended"] } }),
      User.countDocuments({ isActive: true })
    ]),
    Feedback.find()
      .populate("user", feedbackUserSelect)
      .populate({ path: "event", populate: publicEventPopulate })
      .sort({ createdAt: -1 })
      .limit(3)
  ]);

  return sendSuccess(res, {
    data: {
      featuredEvents,
      trendingEvents,
      recentEvents,
      categories,
      stats: {
        totalEvents: stats[0],
        totalRegistrations: stats[1],
        activeUsers: stats[2]
      },
      testimonials
    }
  });
};

export const getEvents = async (req, res) => {
  const { page, limit, skip } = parsePagination(req.query);
  const filters = buildEventFilters(req.query);

  if (!req.user || req.user.role === "participant") {
    filters.approvalStatus = "approved";
  } else if (req.user.role === "organizer" && !req.query.includeAll) {
    filters.organizer = req.user._id;
  }

  const [events, total] = await Promise.all([
    Event.find(filters)
      .populate(publicEventPopulate)
      .sort({ startDate: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Event.countDocuments(filters)
  ]);

  return sendSuccess(res, {
    data: events,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
};

export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate(publicEventPopulate)
    .lean();
  if (!event) throw createError("Event not found", 404);
  const canViewUnapproved =
    req.user &&
    (req.user.role === "admin" || event.organizer?._id?.toString() === req.user._id.toString());

  if (event.approvalStatus !== "approved" && !canViewUnapproved) {
    throw createError("Event not found", 404);
  }

  const [feedback, relatedEvents] = await Promise.all([
    Feedback.find({ event: event._id }).populate("user", feedbackUserSelect).sort({ createdAt: -1 }),
    Event.find({
      _id: { $ne: event._id },
      category: event.category?._id,
      approvalStatus: "approved"
    })
      .populate(publicEventPopulate)
      .limit(3)
  ]);

  return sendSuccess(res, { data: { ...event, feedback, relatedEvents } });
};

export const createEvent = async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) throw createError("Selected category not found", 404);

  const image = req.files?.image?.[0]
    ? await uploadBuffer(req.files.image[0].buffer, "eventsphere/events")
    : "";
  const banner = req.files?.banner?.[0]
    ? await uploadBuffer(req.files.banner[0].buffer, "eventsphere/banners")
    : "";

  const event = await Event.create({
    ...req.body,
    organizer: req.user._id,
    organizerName: req.user.name,
    image,
    banner,
    tags: req.body.tags ? JSON.parse(req.body.tags) : [],
    status: computeStatus(req.body.startDate, req.body.endDate),
    approvalStatus: req.user.role === "admin" ? "approved" : "pending",
    shareSlug: buildSlug(req.body.title)
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: req.user.role === "admin" ? "Event created and approved" : "Event submitted for approval",
    data: event
  });
};

export const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw createError("Event not found", 404);

  const isOwner = event.organizer.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== "admin") {
    throw createError("You can edit only your own events", 403);
  }

  if (req.files?.image?.[0]) {
    req.body.image = await uploadBuffer(req.files.image[0].buffer, "eventsphere/events");
  }
  if (req.files?.banner?.[0]) {
    req.body.banner = await uploadBuffer(req.files.banner[0].buffer, "eventsphere/banners");
  }
  if (req.body.tags && typeof req.body.tags === "string") {
    req.body.tags = JSON.parse(req.body.tags);
  }

  req.body.status = computeStatus(req.body.startDate || event.startDate, req.body.endDate || event.endDate);
  if (req.user.role === "organizer") {
    req.body.approvalStatus = "pending";
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate("category organizer");

  return sendSuccess(res, { message: "Event updated successfully", data: updatedEvent });
};

export const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw createError("Event not found", 404);

  const isOwner = event.organizer.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== "admin") {
    throw createError("You can delete only your own events", 403);
  }

  await Registration.deleteMany({ event: event._id });
  await event.deleteOne();

  return sendSuccess(res, { message: "Event deleted successfully" });
};

export const approveEvent = async (req, res) => {
  const { approvalStatus, approvalNote } = req.body;
  const event = await Event.findById(req.params.id);
  if (!event) throw createError("Event not found", 404);

  event.approvalStatus = approvalStatus;
  event.approvalNote = approvalNote;
  await event.save();

  await Notification.create({
    user: event.organizer,
    title: `Event ${approvalStatus}`,
    message: `${event.title} has been ${approvalStatus} by admin.`,
    type: approvalStatus === "approved" ? "success" : "warning",
    relatedEvent: event._id
  });

  return sendSuccess(res, { message: `Event ${approvalStatus}`, data: event });
};

export const getRecommendations = async (req, res) => {
  const user = await User.findById(req.user._id);
  const categories = user.interests || [];

  const categoryDocs = await Category.find({ name: { $in: categories } });
  const categoryIds = categoryDocs.map((item) => item._id);

  const recommended = await Event.find({
    approvalStatus: "approved",
    $or: [{ category: { $in: categoryIds } }, { tags: { $in: categories } }]
  })
    .populate(publicEventPopulate)
    .sort({ trendingScore: -1, startDate: 1 })
    .limit(6);

  return sendSuccess(res, { data: recommended });
};

export const getOrganizerParticipants = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw createError("Event not found", 404);
  if (req.user.role !== "admin" && event.organizer.toString() !== req.user._id.toString()) {
    throw createError("Access denied", 403);
  }

  const participants = await Registration.find({ event: event._id })
    .populate("participant", "name email phone institute")
    .sort({ createdAt: -1 });

  return sendSuccess(res, { data: participants });
};

export const exportParticipantsCsv = async (req, res) => {
  const registrations = await Registration.find({ event: req.params.id }).populate(
    "participant",
    "name email phone institute"
  );

  const csv = stringify(
    registrations.map((item) => ({
      name: item.participant?.name,
      email: item.participant?.email,
      phone: item.participant?.phone,
      institute: item.participant?.institute,
      status: item.status,
      ticketNumber: item.ticketNumber
    })),
    { header: true }
  );

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename=event-${req.params.id}-participants.csv`);
  res.status(200).send(csv);
};
