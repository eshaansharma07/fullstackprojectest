import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import Notification from "../models/Notification.js";

dotenv.config({ path: "../.env" });

const seed = async () => {
  await connectDB(process.env.MONGODB_URI);

  await Promise.all([
    User.deleteMany(),
    Category.deleteMany(),
    Event.deleteMany(),
    Registration.deleteMany(),
    Notification.deleteMany()
  ]);

  const categories = await Category.insertMany([
    { name: "Tech Fest", description: "Hackathons, coding contests, and robotics." },
    { name: "Cultural", description: "Dance, music, drama, and celebrations.", color: "#ec4899" },
    { name: "Sports", description: "Tournaments, matches, and fitness drives.", color: "#f97316" },
    { name: "Workshop", description: "Skill-building sessions and practical learning.", color: "#10b981" }
  ]);

  const [admin, organizer, participant] = await User.create([
    {
      name: "Aarav Admin",
      email: "admin@eventsphere.com",
      password: "password123",
      role: "admin",
      institute: "EventSphere HQ",
      interests: ["Tech Fest", "Workshop"]
    },
    {
      name: "Olivia Organizer",
      email: "organizer@eventsphere.com",
      password: "password123",
      role: "organizer",
      institute: "City College",
      interests: ["Cultural", "Workshop"]
    },
    {
      name: "Priya Participant",
      email: "participant@eventsphere.com",
      password: "password123",
      role: "participant",
      institute: "City College",
      interests: ["Tech Fest", "Sports"]
    }
  ]);

  const events = await Event.insertMany([
    {
      title: "Innovation Sprint 2026",
      description: "A 24-hour hackathon focused on solving campus and community problems with smart technology.",
      category: categories[0]._id,
      organizer: organizer._id,
      organizerName: organizer.name,
      venue: "Main Auditorium",
      capacity: 250,
      registrationCount: 82,
      startDate: new Date("2026-05-12T09:00:00.000Z"),
      endDate: new Date("2026-05-13T18:00:00.000Z"),
      registrationDeadline: new Date("2026-05-10T18:00:00.000Z"),
      mode: "offline",
      status: "upcoming",
      approvalStatus: "approved",
      tags: ["hackathon", "innovation", "startup"],
      featured: true,
      trendingScore: 96,
      shareSlug: "innovation-sprint-2026-demo"
    },
    {
      title: "Rangmanch Cultural Evening",
      description: "A premium cultural showcase featuring dance crews, music bands, and spoken word performances.",
      category: categories[1]._id,
      organizer: organizer._id,
      organizerName: organizer.name,
      venue: "Open Air Theatre",
      capacity: 400,
      registrationCount: 178,
      startDate: new Date("2026-05-24T13:00:00.000Z"),
      endDate: new Date("2026-05-24T20:00:00.000Z"),
      registrationDeadline: new Date("2026-05-22T18:00:00.000Z"),
      mode: "offline",
      status: "upcoming",
      approvalStatus: "approved",
      tags: ["music", "dance", "college fest"],
      featured: true,
      trendingScore: 128,
      shareSlug: "rangmanch-cultural-evening-demo"
    }
  ]);

  await Registration.create({
    event: events[0]._id,
    participant: participant._id,
    status: "registered",
    qrToken: "seed-qr-token-123",
    ticketNumber: "EVS-SEED-001"
  });

  await Notification.create({
    user: participant._id,
    title: "Seed data ready",
    message: "Sample accounts, categories, and events have been created.",
    type: "info"
  });

  console.log("Seed completed successfully");
  await mongoose.connection.close();
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
