import { useState } from "react";
import Navbar from "./Navbar";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=7ff896bb&s=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-6">🔍 Search Movies</h1>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Search movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 rounded-lg text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </div>

        {loading && <p>Loading...</p>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-gray-800 p-4 rounded-xl shadow-lg"
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x400"
                }
                alt={movie.Title}
                className="w-full h-64 object-cover rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold">{movie.Title}</h2>
              <p className="text-sm text-gray-400">{movie.Year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
