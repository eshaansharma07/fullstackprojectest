import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    certificateId: { type: String, required: true, unique: true },
    issueDate: { type: Date, default: Date.now },
    downloadUrl: String
  },
  { timestamps: true }
);

certificateSchema.index({ event: 1, user: 1 }, { unique: true });

export default mongoose.model("Certificate", certificateSchema);
