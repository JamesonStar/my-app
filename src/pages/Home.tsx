import { useEffect, useState } from "react";
import { useRef } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";



export default function Home() {
  const navigate = useNavigate();
  const [trendingMovie, setTrendingMovie] = useState<any>(null);
  const [trendingList, setTrendingList] = useState<any[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [popularActors, setPopularActors] = useState<any[]>([]);

  const TMDB_API_KEY = "7d1a78e436047fa83ef2f7d010d6bc94";

  const trendingRef = useRef<HTMLDivElement>(null);

  const scrollTrending = (dir: "left" | "right") => {
    if (!trendingRef.current) return;
    const scrollAmount = 300;
    trendingRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    const fetchTrending = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
      );
      const data = await res.json();
      setTrendingMovie(data.results[0]);
      setTrendingList(data.results.slice(1, 11));
    };

    const fetchActors = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      setPopularActors(data.results.slice(0, 10));
    };

    fetchTrending();
    fetchActors();
  }, []);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (!trendingMovie) return;
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${trendingMovie.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const data = await res.json();
      const trailer = data.results.find((v: any) => v.type === "Trailer");
      setTrailerKey(trailer ? trailer.key : null);
    };
    fetchTrailer();
  }, [trendingMovie]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">

      {/* --- HERO VIDEO --- */}
      {trendingMovie && (
        <div className="relative w-[90%] mx-auto mt-14 mb-16 rounded-2xl overflow-hidden shadow-2xl">
          {trailerKey ? (
            <div className="relative w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&controls=0&playlist=${trailerKey}`}
                title={trendingMovie.title}
                className="absolute top-0 left-0 w-full h-full rounded-2xl"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>

          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original${trendingMovie.backdrop_path}`}
              alt={trendingMovie.title}
              className="w-full h-[450px] object-cover"
            />
          )}
          <div className="absolute bottom-0 left-0 w-full bg-black/50 p-5">
            <h1 className="text-3xl font-bold">{trendingMovie.title}</h1>
            <p className="text-sm text-gray-200 mt-2 line-clamp-2">{trendingMovie.overview}</p>
          </div>
        </div>
      )}

      {/* --- TRENDING LIST --- */}
      <div className="relative w-[90%] mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>

        {/* Tombol kiri */}
        <button
          onClick={() => scrollTrending("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full z-10"
        >
          ◀
        </button>

        {/* Container scroll */}
        <div
          ref={trendingRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {trendingList.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="min-w-[150px] bg-gray-800 rounded-xl cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[225px] object-cover rounded-t-xl"
              />
              <div className="p-2">
                <h3 className="text-sm">{movie.title}</h3>
              </div>
            </div>
          ))}

        </div>

        {/* Tombol kanan */}
        <button
          onClick={() => scrollTrending("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full z-10"
        >
          ▶
        </button>
      </div>


      {/* --- POPULAR ACTORS --- */}
      <div className="w-[90%] mx-auto mt-12 mb-10">
        <h2 className="text-2xl font-bold mb-4">Popular Actors</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {popularActors.map((actor) => (
            <div key={actor.id} className="min-w-[120px] flex flex-col items-center">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={actor.name}
                className="w-[120px] h-[160px] object-cover rounded-xl mb-2"
              />
              <p className="text-sm text-center">{actor.name}</p>
            </div>
          ))}
          <Footer />
        </div>

      </div>
    </div>
  );
}
