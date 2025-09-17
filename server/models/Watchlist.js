import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  poster: String,
  releaseDate: String,
  rating: Number
});

export default mongoose.model("Watchlist", watchlistSchema);
