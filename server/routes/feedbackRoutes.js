import { Router } from "express";
import { getEventFeedback, submitFeedback } from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/:eventId", getEventFeedback);
router.post("/:eventId", protect, submitFeedback);

export default router;
