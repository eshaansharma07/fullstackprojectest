import Category from "../models/Category.js";
import { defaultCategories } from "../data/defaultCategories.js";

export const ensureDefaultCategories = async () => {
  const total = await Category.countDocuments();

  if (total > 0) {
    return Category.find().sort({ name: 1 });
  }

  await Category.insertMany(defaultCategories);
  return Category.find().sort({ name: 1 });
};
