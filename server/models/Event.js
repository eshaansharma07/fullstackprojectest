import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    organizerName: { type: String, required: true },
    venue: { type: String, required: true },
    capacity: { type: Number, required: true },
    registrationCount: { type: Number, default: 0 },
    waitlistCount: { type: Number, default: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    registrationDeadline: { type: Date, required: true },
    mode: { type: String, enum: ["online", "offline"], default: "offline" },
    meetingLink: String,
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming"
    },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    approvalNote: String,
    image: String,
    banner: String,
    tags: [String],
    featured: { type: Boolean, default: false },
    trendingScore: { type: Number, default: 0 },
    liveAnnouncement: String,
    shareSlug: { type: String, unique: true, required: true },
    attendeesCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
