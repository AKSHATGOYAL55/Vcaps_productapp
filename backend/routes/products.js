// backend/routes/products.js
import express from "express";
import Product from "../models/Product.js";
import { requireAuth } from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import { productCreateValidators } from "../utils/validators.js";
import { validationResult } from "express-validator";

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `product-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

// Public: GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public: GET product by id
router.get("/:id", async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: "Invalid id or server error" });
  }
});

// Protected: create product (image optional)
router.post("/", requireAuth, upload.single("image"), productCreateValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, price, category, inStock } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const product = new Product({ name, price, category, inStock: inStock === undefined ? true : inStock, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protected: update product (supports changing image)
router.put("/:id", requireAuth, upload.single("image"), productCreateValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, price, category, inStock } = req.body;
    product.name = name;
    product.price = price;
    product.category = category;
    product.inStock = inStock === undefined ? product.inStock : inStock;

    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
      // optional: delete previous file on disk
    }

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protected: delete product
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
