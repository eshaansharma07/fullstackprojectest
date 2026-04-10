import { Router } from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getCategories);
router.post("/", protect, authorize("admin"), createCategory);
router.put("/:id", protect, authorize("admin"), updateCategory);
router.delete("/:id", protect, authorize("admin"), deleteCategory);

export default router;
