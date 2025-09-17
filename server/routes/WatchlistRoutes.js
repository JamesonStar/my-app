import express from "express";
import Watchlist from "../models/Watchlist.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Tambah watchlist
// server/routes/WatchlistRoutes.js
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { tmdbId, title, poster, releaseDate, rating } = req.body;

    const newMovie = new Watchlist({
      userId: req.user.id,
      tmdbId,
      title,
      poster,
      releaseDate,
      rating
    });

    await newMovie.save();
    res.json(newMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Ambil watchlist user yg login
router.get("/", authMiddleware, async (req, res) => {
  try {
    const movies = await Watchlist.find({ userId: req.user.id });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
