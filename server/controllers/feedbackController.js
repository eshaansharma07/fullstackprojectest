import Feedback from "../models/Feedback.js";
import Registration from "../models/Registration.js";
import { sendSuccess, createError } from "../utils/apiResponse.js";

export const submitFeedback = async (req, res) => {
  const registration = await Registration.findOne({
    event: req.params.eventId,
    participant: req.user._id,
    status: "attended"
  });

  if (!registration) {
    throw createError("You can submit feedback only after attending the event", 403);
  }

  const feedback = await Feedback.findOneAndUpdate(
    { event: req.params.eventId, user: req.user._id },
    { rating: req.body.rating, comment: req.body.comment },
    { new: true, upsert: true }
  );

  return sendSuccess(res, { message: "Feedback submitted successfully", data: feedback });
};

export const getEventFeedback = async (req, res) => {
  const feedback = await Feedback.find({ event: req.params.eventId }).populate("user", "name profilePicture");
  return sendSuccess(res, { data: feedback });
};
