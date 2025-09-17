import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const apiKey = "7d1a78e436047fa83ef2f7d010d6bc94";

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await res.json();
    setResults(data.results || []);
  }

  function goToDetail(id: number) {
    navigate(`/movie/${id}`);
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      {/* Form Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movie..."
          className="flex-grow px-4 py-2 rounded-lg bg-[#1e293b] text-white focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
        >
          Search
        </button>
      </form>

      {/* Hasil pencarian */}
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {results.map((movie) => (
            <div
              key={movie.id}
              onClick={() => goToDetail(movie.id)}
              className="cursor-pointer hover:scale-105 transition"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
                className="rounded-lg shadow-lg w-full"
              />
              <p className="mt-2 text-sm text-center">{movie.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No results found.</p>
      )}
    </div>
  );
}
