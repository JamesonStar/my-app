import React, { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  _id: string;
  tmdbId: number;
  title: string;
  poster?: string;
  releaseDate: string;
  rating: number;
}

export default function Watchlist() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const token = localStorage.getItem("token");

  const TMDB_KEY = "7d1a78e436047fa83ef2f7d010d6bc94"; // ganti dg API key kamu
  const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    if (!token) {
      console.error("⚠️ Tidak ada token, user belum login");
      return;
    }

    axios
      .get("http://localhost:3001/api/watchlist", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (res) => {
        const enrichedMovies = await Promise.all(
          res.data.map(async (m: Movie) => {
            if (!m.poster && m.tmdbId) {
              try {
                const tmdbRes = await axios.get(
                  `https://api.themoviedb.org/3/movie/${m.tmdbId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${TMDB_KEY}`,
                      accept: "application/json",
                    },
                  }
                );
                return {
                  ...m,
                  poster: tmdbRes.data.poster_path
                    ? `${TMDB_IMG}${tmdbRes.data.poster_path}`
                    : "",
                };
              } catch (e) {
                console.error("Gagal fetch TMDB:", e);
              }
            }
            return m;
          })
        );
        setMovies(enrichedMovies);
      })
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">🎬 Watchlist Saya</h2>

      {movies.length === 0 ? (
        <p className="text-gray-400">Belum ada film di watchlist.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((m) => (
            <div
              key={m._id}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={
                  m.poster
                    ? m.poster
                    : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={m.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white truncate">
                  {m.title}
                </h3>
                <p className="text-gray-400 text-sm">{m.releaseDate}</p>
                <p className="text-yellow-400 mt-1">⭐ {m.rating}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
