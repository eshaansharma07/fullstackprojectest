import User from "../models/User.js";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import Certificate from "../models/Certificate.js";
import { sendSuccess, createError } from "../utils/apiResponse.js";
import { uploadBuffer } from "../utils/cloudinary.js";

export const updateProfile = async (req, res) => {
  const updates = { ...req.body };
  if (req.file) {
    updates.profilePicture = await uploadBuffer(req.file.buffer, "eventsphere/users");
  }
  if (updates.interests && typeof updates.interests === "string") {
    updates.interests = JSON.parse(updates.interests);
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true
  }).select("-password");

  return sendSuccess(res, { message: "Profile updated", data: user });
};

export const toggleFavorite = async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) throw createError("Event not found", 404);

  const user = await User.findById(req.user._id);
  const isFavorite = user.favorites.some((fav) => fav.toString() === event._id.toString());

  user.favorites = isFavorite
    ? user.favorites.filter((fav) => fav.toString() !== event._id.toString())
    : [...user.favorites, event._id];

  await user.save();
  await user.populate("favorites");

  return sendSuccess(res, {
    message: isFavorite ? "Removed from favorites" : "Added to favorites",
    data: user.favorites
  });
};

export const getFavorites = async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "favorites",
    populate: ["category", "organizer"]
  });

  return sendSuccess(res, { data: user.favorites });
};

export const getMyActivity = async (req, res) => {
  const [registrations, certificates] = await Promise.all([
    Registration.find({ participant: req.user._id })
      .populate({
        path: "event",
        populate: ["category", "organizer"]
      })
      .sort({ createdAt: -1 }),
    Certificate.find({ user: req.user._id }).populate("event")
  ]);

  return sendSuccess(res, {
    data: {
      registrations,
      certificates,
      attendedEvents: registrations.filter((item) => item.status === "attended"),
      pastEvents: registrations.filter(
        (item) => item.event?.endDate && new Date(item.event.endDate) < new Date()
      )
    }
  });
};

export const getUsers = async (_req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  return sendSuccess(res, { data: users });
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw createError("User not found", 404);
  if (user.role === "admin") throw createError("Admin users cannot be deleted", 400);

  await user.deleteOne();
  return sendSuccess(res, { message: "User deleted successfully" });
};
