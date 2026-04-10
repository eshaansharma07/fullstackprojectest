import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/apiResponse.js";

export const protect = async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return next(createError("Authentication token missing", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    return next(createError("User not found", 401));
  }

  req.user = user;
  next();
};

export const optionalProtect = async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    req.user = user || null;
  } catch {
    req.user = null;
  }

  next();
};

export const authorize = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(createError("You are not allowed to perform this action", 403));
  }

  next();
};
