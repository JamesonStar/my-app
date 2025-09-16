import { useEffect, useState } from "react";

const API_KEY = "7d1a78e436047fa83ef2f7d010d6bc94";

export default function Home() {
  const [trendingMovie, setTrendingMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trendingList, setTrendingList] = useState([]);

  useEffect(() => {
    async function fetchTrending() {
      try {
        // Ambil film trending harian
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
        );
        const data = await res.json();
        setTrendingMovie(data.results[0]);
        setTrendingList(data.results);

        // Ambil trailer film pertama
        const videoRes = await fetch(
          `https://api.themoviedb.org/3/movie/${data.results[0].id}/videos?api_key=${API_KEY}`
        );
        const videoData = await videoRes.json();

        const trailer = videoData.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error("Gagal ambil data TMDB:", err);
      }
    }

    fetchTrending();
  }, []);

  return (
    <div className="home-page text-white">
      {/* === Bagian Trailer (Hero) === */}
      {trendingMovie && (
        <div className="relative w-[90%] mx-auto mt-14 mb-16 rounded-2xl overflow-hidden shadow-2xl">
          {trailerKey ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&controls=0&playlist=${trailerKey}`}
              title={trendingMovie.title}
              className="w-full h-[420px] object-cover"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original${trendingMovie.backdrop_path}`}
              alt={trendingMovie.title}
              className="w-full h-[420px] object-cover"
            />
          )}

          {/* Overlay judul + sinopsis */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
            <h1 className="text-3xl font-bold text-white">{trendingMovie.title}</h1>
            <p className="text-sm text-gray-200 mt-2 line-clamp-3">
              {trendingMovie.overview}
            </p>
          </div>
        </div>
      )}


      {/* === Bagian Grid Film Trending === */}
      <section className="px-8">
        <h2 className="text-2xl font-semibold mb-4">Trending Hari Ini</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {trendingList.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
