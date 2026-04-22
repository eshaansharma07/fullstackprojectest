import crypto from "crypto";
import QRCode from "qrcode";
import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import Notification from "../models/Notification.js";
import Certificate from "../models/Certificate.js";
import { sendSuccess, createError } from "../utils/apiResponse.js";
import { sendEmail } from "../utils/email.js";

const createTicketNumber = () => `EVS-${Date.now().toString().slice(-6)}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;

const ensureAttendanceAccess = (registration, user) => {
  const organizerId = registration.event?.organizer?.toString?.() || registration.event?.organizer?._id?.toString?.();
  if (user.role !== "admin" && organizerId !== user._id.toString()) {
    throw createError("Only organizers or admins can manage attendance", 403);
  }
};

const syncEventAttendanceCount = async (eventId) => {
  const attendeesCount = await Registration.countDocuments({ event: eventId, status: "attended" });
  await Event.findByIdAndUpdate(eventId, { attendeesCount });
  return attendeesCount;
};

const syncAttendanceArtifacts = async (registration, status) => {
  if (status === "attended") {
    let certificate = await Certificate.findOne({ event: registration.event._id, user: registration.participant._id });
    if (!certificate) {
      certificate = await Certificate.create({
        event: registration.event._id,
        user: registration.participant._id,
        certificateId: `CERT-${crypto.randomBytes(4).toString("hex").toUpperCase()}`
      });
    }
    registration.certificateIssued = true;
    registration.checkedInAt = new Date();
    return certificate;
  }

  await Certificate.findOneAndDelete({ event: registration.event._id, user: registration.participant._id });
  registration.certificateIssued = false;
  registration.checkedInAt = null;
  return null;
};

export const registerForEvent = async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) throw createError("Event not found", 404);
  if (event.approvalStatus !== "approved") throw createError("This event is not open for registrations", 400);
  if (new Date(event.registrationDeadline) < new Date()) throw createError("Registration deadline has passed", 400);

  const existing = await Registration.findOne({ event: event._id, participant: req.user._id });
  if (existing && existing.status !== "cancelled") {
    throw createError("You are already registered for this event", 400);
  }

  const isFull = event.registrationCount >= event.capacity;
  const registration = existing || new Registration({
    event: event._id,
    participant: req.user._id,
    qrToken: crypto.randomBytes(16).toString("hex"),
    ticketNumber: createTicketNumber()
  });

  registration.status = isFull ? "waitlisted" : "registered";
  await registration.save();

  if (isFull) {
    event.waitlistCount += 1;
  } else {
    event.registrationCount += 1;
    event.trendingScore += 4;
  }
  await event.save();

  const qrCode = await QRCode.toDataURL(
    JSON.stringify({
      registrationId: registration._id,
      qrToken: registration.qrToken,
      eventId: event._id
    })
  );

  await Notification.create({
    user: req.user._id,
    title: isFull ? "Added to waitlist" : "Registration confirmed",
    message: `Your ${isFull ? "waitlist entry" : "registration"} for ${event.title} is ready.`,
    type: isFull ? "warning" : "success",
    relatedEvent: event._id
  });

  await sendEmail({
    to: req.user.email,
    subject: `EventSphere: ${event.title}`,
    html: `<p>Hello ${req.user.name},</p><p>Your status for <strong>${event.title}</strong> is <strong>${registration.status}</strong>.</p><p>Ticket Number: ${registration.ticketNumber}</p>`
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: isFull ? "Event is full. You have been added to the waitlist." : "Registration successful",
    data: {
      registration,
      qrCode
    }
  });
};

export const cancelRegistration = async (req, res) => {
  const registration = await Registration.findOne({
    _id: req.params.id,
    participant: req.user._id
  }).populate("event");
  if (!registration) throw createError("Registration not found", 404);
  if (registration.status === "cancelled") throw createError("Registration is already cancelled", 400);

  registration.status = "cancelled";
  await registration.save();

  const event = await Event.findById(registration.event._id);
  if (event && event.registrationCount > 0) {
    event.registrationCount -= 1;
    await event.save();

    const waitlisted = await Registration.findOne({ event: event._id, status: "waitlisted" }).sort({ createdAt: 1 });
    if (waitlisted) {
      waitlisted.status = "registered";
      await waitlisted.save();
      event.registrationCount += 1;
      event.waitlistCount = Math.max(event.waitlistCount - 1, 0);
      await event.save();
    }
  }

  return sendSuccess(res, { message: "Registration cancelled successfully" });
};

export const getMyRegistrations = async (req, res) => {
  const registrations = await Registration.find({ participant: req.user._id })
    .populate({
      path: "event",
      populate: ["category", "organizer"]
    })
    .sort({ createdAt: -1 });

  const enriched = await Promise.all(
    registrations.map(async (registration) => {
      const qrCode = await QRCode.toDataURL(
        JSON.stringify({
          registrationId: registration._id,
          qrToken: registration.qrToken,
          eventId: registration.event?._id
        })
      );

      return { ...registration.toObject(), qrCode };
    })
  );

  return sendSuccess(res, { data: enriched });
};

export const getAttendanceBoard = async (req, res) => {
  const eventFilters = req.user.role === "admin" ? {} : { organizer: req.user._id };
  const events = await Event.find(eventFilters)
    .select("title startDate venue approvalStatus organizer attendeesCount registrationCount")
    .sort({ startDate: -1, createdAt: -1 });

  if (!events.length) {
    return sendSuccess(res, {
      data: {
        events: [],
        selectedEventId: null,
        registrations: [],
        summary: { total: 0, present: 0, absent: 0, pending: 0 }
      }
    });
  }

  const selectedEventId = req.query.eventId || events[0]._id.toString();
  const selectedEvent = events.find((event) => event._id.toString() === selectedEventId);
  if (!selectedEvent) throw createError("Event not found", 404);

  const registrations = await Registration.find({ event: selectedEventId })
    .populate("participant", "name email institute")
    .sort({ createdAt: 1 });

  const summary = registrations.reduce(
    (acc, registration) => {
      acc.total += 1;
      if (registration.status === "attended") acc.present += 1;
      else if (registration.status === "absent") acc.absent += 1;
      else if (registration.status !== "cancelled" && registration.status !== "waitlisted") acc.pending += 1;
      return acc;
    },
    { total: 0, present: 0, absent: 0, pending: 0 }
  );

  return sendSuccess(res, {
    data: {
      events,
      selectedEventId,
      registrations,
      summary
    }
  });
};

export const updateAttendanceStatus = async (req, res) => {
  const { status } = req.body;
  if (!["attended", "absent"].includes(status)) {
    throw createError("Attendance status must be attended or absent", 400);
  }

  const registration = await Registration.findById(req.params.id).populate("event participant");
  if (!registration) throw createError("Registration not found", 404);

  ensureAttendanceAccess(registration, req.user);

  if (["cancelled", "waitlisted"].includes(registration.status)) {
    throw createError("Only confirmed registrations can be marked present or absent", 400);
  }

  const certificate = await syncAttendanceArtifacts(registration, status);
  registration.status = status;
  await registration.save();

  const attendeesCount = await syncEventAttendanceCount(registration.event._id);

  return sendSuccess(res, {
    message: status === "attended" ? "Marked present successfully" : "Marked absent successfully",
    data: { registration, certificate, attendeesCount }
  });
};

export const markAttendance = async (req, res) => {
  const { qrToken } = req.body;
  const registration = await Registration.findOne({ qrToken }).populate("event participant");
  if (!registration) throw createError("Invalid QR code", 404);

  ensureAttendanceAccess(registration, req.user);

  const certificate = await syncAttendanceArtifacts(registration, "attended");
  registration.status = "attended";
  await registration.save();
  await syncEventAttendanceCount(registration.event._id);

  return sendSuccess(res, {
    message: "Attendance marked successfully",
    data: { registration, certificate }
  });
};
