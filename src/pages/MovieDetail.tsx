import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=7d1a78e436047fa83ef2f7d010d6bc94&language=en-US`
      );
      const data = await res.json();
      setMovie(data);
    }
    fetchMovie();
  }, [id]);

  if (!movie) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="flex gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-300 mb-3">{movie.overview}</p>
          <p className="text-sm text-gray-400">
            Release date: {movie.release_date} | Rating: {movie.vote_average}
          </p>
          <button className="mt-6 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600">
            + Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}
