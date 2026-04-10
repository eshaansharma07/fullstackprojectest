import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    participant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["registered", "cancelled", "waitlisted", "attended"],
      default: "registered"
    },
    qrToken: { type: String, required: true, unique: true },
    ticketNumber: { type: String, required: true, unique: true },
    reminderSent: { type: Boolean, default: false },
    checkedInAt: Date,
    certificateIssued: { type: Boolean, default: false }
  },
  { timestamps: true }
);

registrationSchema.index({ event: 1, participant: 1 }, { unique: true });

export default mongoose.model("Registration", registrationSchema);
