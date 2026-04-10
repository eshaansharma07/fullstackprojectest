import { Router } from "express";
import { deleteUser, getFavorites, getMyActivity, getUsers, toggleFavorite, updateProfile } from "../controllers/userController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = Router();

router.use(protect);

router.get("/me/activity", getMyActivity);
router.put("/me", upload.single("profilePicture"), updateProfile);
router.get("/favorites", getFavorites);
router.post("/favorites/:eventId", toggleFavorite);
router.get("/", authorize("admin"), getUsers);
router.delete("/:id", authorize("admin"), deleteUser);

export default router;
