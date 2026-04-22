import { Router } from "express";
import {
  cancelRegistration,
  getAttendanceBoard,
  getMyRegistrations,
  markAttendance,
  registerForEvent,
  updateAttendanceStatus
} from "../controllers/registrationController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);

router.get("/me", getMyRegistrations);
router.get("/attendance", authorize("admin", "organizer"), getAttendanceBoard);
router.post("/event/:eventId", authorize("participant"), registerForEvent);
router.patch("/:id/cancel", authorize("participant"), cancelRegistration);
router.patch("/:id/attendance", authorize("admin", "organizer"), updateAttendanceStatus);
router.post("/scan", authorize("admin", "organizer"), markAttendance);

export default router;
