import Category from "../models/Category.js";
import { sendSuccess, createError } from "../utils/apiResponse.js";
import { ensureDefaultCategories } from "../utils/bootstrapCategories.js";

export const getCategories = async (_req, res) => {
  const categories = await ensureDefaultCategories();
  return sendSuccess(res, { data: categories });
};

export const createCategory = async (req, res) => {
  const exists = await Category.findOne({ name: req.body.name });
  if (exists) throw createError("Category already exists", 409);
  const category = await Category.create(req.body);
  return sendSuccess(res, { statusCode: 201, message: "Category created", data: category });
};

export const updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!category) throw createError("Category not found", 404);
  return sendSuccess(res, { message: "Category updated", data: category });
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw createError("Category not found", 404);
  await category.deleteOne();
  return sendSuccess(res, { message: "Category deleted" });
};
