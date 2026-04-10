import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: String,
    color: {
      type: String,
      default: "#0ea5e9"
    },
    icon: {
      type: String,
      default: "CalendarDays"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
