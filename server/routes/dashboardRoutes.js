import { Router } from "express";
import { getAdminDashboard, getOrganizerDashboard, getParticipantDashboard } from "../controllers/dashboardController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);

router.get("/participant", authorize("participant"), getParticipantDashboard);
router.get("/organizer", authorize("organizer", "admin"), getOrganizerDashboard);
router.get("/admin", authorize("admin"), getAdminDashboard);

export default router;
