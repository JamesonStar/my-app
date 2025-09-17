import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);
  const apiKey = "7d1a78e436047fa83ef2f7d010d6bc94";
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");


  useEffect(() => {
    async function fetchMovie() {
      const [movieRes, creditsRes] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
        ),
      ]);

      const movieData = await movieRes.json();
      const creditsData = await creditsRes.json();

      setMovie(movieData);
      setCast(creditsData.cast.slice(0, 10)); // ambil 10 aktor teratas
    }

    fetchMovie();
  }, [id]);

  if (!movie) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      {/* Detail Film */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-64 rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-300 mb-3">{movie.overview}</p>
          <p className="text-sm text-gray-400">
            Release date: {movie.release_date} | Rating: {movie.vote_average}
          </p>
          <button
            onClick={async () => {
              await fetch("http://localhost:3001/api/watchlist", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                  tmdbId: movie.id, // <--- penting
                  title: movie.title,
                  poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // <--- simpan full URL langsung
                  releaseDate: movie.release_date,
                  rating: movie.vote_average,
                }),
              });
              alert("Movie added to Watchlist!");
            }}
            className="mt-6 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
          >
            + Add to Watchlist
          </button>


        </div>
      </div>

      {/* Aktor / Pemeran */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Top Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {cast.map((actor) => (
            <div
              key={actor.id}
              className="bg-[#1e293b] rounded-lg p-2 shadow hover:scale-105 transition"
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={actor.name}
                className="rounded-md w-full h-48 object-cover"
              />
              <p className="mt-2 text-sm font-medium text-center">
                {actor.name}
              </p>
              <p className="text-xs text-gray-400 text-center">
                as {actor.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
