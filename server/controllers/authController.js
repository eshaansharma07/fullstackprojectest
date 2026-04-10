import crypto from "crypto";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { createToken } from "../utils/token.js";
import { sendSuccess, createError } from "../utils/apiResponse.js";
import { sendEmail } from "../utils/email.js";
import { uploadBuffer } from "../utils/cloudinary.js";

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  institute: user.institute,
  bio: user.bio,
  interests: user.interests,
  language: user.language,
  profilePicture: user.profilePicture,
  favorites: user.favorites
});

export const register = async (req, res) => {
  const { name, email, password, role, phone, institute, interests } = req.body;

  const exists = await User.findOne({ email });
  if (exists) throw createError("An account with this email already exists", 409);

  const profilePicture = req.file ? await uploadBuffer(req.file.buffer, "eventsphere/users") : "";

  const user = await User.create({
    name,
    email,
    password,
    role: role || "participant",
    phone,
    institute,
    interests: interests ? JSON.parse(interests) : [],
    profilePicture
  });

  await Notification.create({
    user: user._id,
    title: "Welcome to EventSphere",
    message: "Your account is ready. Explore events and manage registrations from one place.",
    type: "success"
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Account created successfully",
    data: {
      user: sanitizeUser(user),
      token: createToken({ id: user._id, role: user.role })
    }
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("favorites");

  if (!user || !(await user.comparePassword(password))) {
    throw createError("Invalid email or password", 401);
  }

  return sendSuccess(res, {
    message: "Login successful",
    data: {
      user: sanitizeUser(user),
      token: createToken({ id: user._id, role: user.role })
    }
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw createError("No user found with this email", 404);

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 1000 * 60 * 20;
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "EventSphere password reset",
    html: `<p>Hello ${user.name},</p><p>Reset your EventSphere password using this link:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in 20 minutes.</p>`
  });

  return sendSuccess(res, {
    message: "Password reset instructions sent",
    data: {
      resetUrl: process.env.NODE_ENV === "production" ? undefined : resetUrl
    }
  });
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) throw createError("Reset link is invalid or expired", 400);

  user.password = password;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  return sendSuccess(res, { message: "Password reset successful" });
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).populate("favorites");
  return sendSuccess(res, { data: sanitizeUser(user) });
};
