import React, { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  _id: string;
  tmdbId: number;
  title: string;
  poster: string;       // sekarang selalu ada URL full
  releaseDate: string;
  rating: number;
}

export default function Watchlist() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("⚠️ Tidak ada token, user belum login");
      return;
    }

    axios
      .get("http://localhost:3001/api/watchlist", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMovies(res.data);
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
