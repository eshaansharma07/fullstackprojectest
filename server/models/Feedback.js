import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String
  },
  { timestamps: true }
);

feedbackSchema.index({ event: 1, user: 1 }, { unique: true });

export default mongoose.model("Feedback", feedbackSchema);
