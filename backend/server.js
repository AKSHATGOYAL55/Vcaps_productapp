// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productsRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // body parser for JSON
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/products", productsRoutes); // GET /api/products
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
