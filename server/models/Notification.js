import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["info", "success", "warning", "announcement", "reminder"],
      default: "info"
    },
    relatedEvent: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    isRead: { type: Boolean, default: false },
    isGlobal: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
