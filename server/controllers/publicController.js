import { sendSuccess } from "../utils/apiResponse.js";
import Notification from "../models/Notification.js";
import Category from "../models/Category.js";

export const getPublicMeta = async (_req, res) => {
  const [announcements, categories] = await Promise.all([
    Notification.find({ isGlobal: true }).sort({ createdAt: -1 }).limit(5),
    Category.find().sort({ name: 1 })
  ]);

  return sendSuccess(res, {
    data: {
      announcements,
      categories,
      faq: [
        {
          question: "How do approvals work?",
          answer: "Organizer events remain pending until an admin approves them from the admin dashboard."
        },
        {
          question: "Can students download tickets?",
          answer: "Yes. Participants can download a ticket PDF and QR code from My Registrations."
        },
        {
          question: "Does EventSphere support waitlists?",
          answer: "Yes. Once capacity is full, new registrations automatically move to the waitlist."
        }
      ]
    }
  });
};

export const submitContactForm = async (req, res) => {
  return sendSuccess(res, {
    statusCode: 201,
    message: "Thanks for contacting EventSphere. We will get back to you soon.",
    data: req.body
  });
};
