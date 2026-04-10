import { Router } from "express";
import { approveEvent, createEvent, deleteEvent, exportParticipantsCsv, getEventById, getEvents, getOrganizerParticipants, getPublicHomeData, getRecommendations, updateEvent } from "../controllers/eventController.js";
import { authorize, optionalProtect, protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = Router();

router.get("/home", getPublicHomeData);
router.get("/", optionalProtect, getEvents);
router.get("/recommendations/ai", protect, getRecommendations);
router.get("/:id", optionalProtect, getEventById);
router.post(
  "/",
  protect,
  authorize("admin", "organizer"),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  createEvent
);
router.put(
  "/:id",
  protect,
  authorize("admin", "organizer"),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  updateEvent
);
router.delete("/:id", protect, authorize("admin", "organizer"), deleteEvent);
router.patch("/:id/approval", protect, authorize("admin"), approveEvent);
router.get("/:id/participants", protect, authorize("admin", "organizer"), getOrganizerParticipants);
router.get("/:id/participants/export", protect, authorize("admin", "organizer"), exportParticipantsCsv);

export default router;
