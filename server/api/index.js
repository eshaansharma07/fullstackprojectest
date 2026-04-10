import dotenv from "dotenv";
import app from "../app.js";
import connectDB from "../config/db.js";

dotenv.config();

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDB(process.env.MONGODB_URI);
    isConnected = true;
  }

  return app(req, res);
}
