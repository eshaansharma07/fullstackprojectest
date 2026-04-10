import { Router } from "express";
import { getPublicMeta, submitContactForm } from "../controllers/publicController.js";

const router = Router();

router.get("/meta", getPublicMeta);
router.post("/contact", submitContactForm);

export default router;
