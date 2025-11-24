// backend/utils/validators.js
import { body } from "express-validator";

export const productCreateValidators = [
  body("name").notEmpty().withMessage("Name is required"),
  body("price").notEmpty().withMessage("Price is required")
    .isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
  body("category").notEmpty().withMessage("Category is required"),
  body("inStock").optional().isBoolean().withMessage("inStock must be boolean")
];
