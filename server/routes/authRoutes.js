import { Router } from "express";
import { forgotPassword, getCurrentUser, login, register, resetPassword } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = Router();

router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/me", protect, getCurrentUser);

export default router;
