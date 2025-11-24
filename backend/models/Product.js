// backend/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: [0, "Price must be positive"] },
  category: { type: String, required: true },
  inStock: { type: Boolean, required: true, default: true },
  image: { type: String } // store file path or URL
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
