import mongoose from "mongoose";

const connectDB = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing. Add it to your environment variables.");
  }

  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  mongoose.set("strictQuery", true);
  return mongoose.connect(mongoUri);
};

export default connectDB;
