import Notification from "../models/Notification.js";
import Registration from "../models/Registration.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({
    $or: [{ user: req.user._id }, { isGlobal: true }]
  }).sort({ createdAt: -1 });

  return sendSuccess(res, { data: notifications });
};

export const markNotificationRead = async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );

  return sendSuccess(res, { message: "Notification marked as read", data: notification });
};

export const sendAnnouncement = async (req, res) => {
  const registrations = await Registration.find({ event: req.params.eventId, status: { $ne: "cancelled" } });

  const docs = registrations.map((item) => ({
    user: item.participant,
    title: req.body.title,
    message: req.body.message,
    type: "announcement",
    relatedEvent: req.params.eventId
  }));

  if (docs.length) {
    await Notification.insertMany(docs);
  }

  return sendSuccess(res, { message: "Announcement sent successfully" });
};

export const createGlobalAnnouncement = async (req, res) => {
  const notification = await Notification.create({
    title: req.body.title,
    message: req.body.message,
    type: "announcement",
    isGlobal: true
  });

  return sendSuccess(res, { statusCode: 201, message: "Global announcement created", data: notification });
};
