import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/AuthRoutes.js";
import watchlistRoutes from "./routes/WatchlistRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// 🔗 Koneksi MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// 📌 Routes
app.use("/api/auth", authRoutes);            // ✅ untuk register & login
app.use("/api/watchlist", watchlistRoutes);  // ✅ untuk watchlist (butuh token)

app.listen(PORT, () => console.log(`✅ Server jalan di http://localhost:${PORT}`));
