import { Router } from "express";
import { cancelRegistration, getMyRegistrations, markAttendance, registerForEvent } from "../controllers/registrationController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);

router.get("/me", getMyRegistrations);
router.post("/event/:eventId", authorize("participant"), registerForEvent);
router.patch("/:id/cancel", authorize("participant"), cancelRegistration);
router.post("/scan", authorize("admin", "organizer"), markAttendance);

export default router;
