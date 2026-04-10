import { Router } from "express";
import { createGlobalAnnouncement, getNotifications, markNotificationRead, sendAnnouncement } from "../controllers/notificationController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);

router.get("/", getNotifications);
router.patch("/:id/read", markNotificationRead);
router.post("/event/:eventId/announcement", authorize("admin", "organizer"), sendAnnouncement);
router.post("/global", authorize("admin"), createGlobalAnnouncement);

export default router;
