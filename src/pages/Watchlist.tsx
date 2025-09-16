import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Watchlist() {
  const navigate = useNavigate();
  const [films, setFilms] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchWatchlist = async () => {
      try {
        // ambil judul dari backend
        const res = await fetch("http://localhost:3001/watchlist", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          setError("Gagal mengambil data watchlist");
          return;
        }

        const titles: string[] = await res.json();

        // fetch data lengkap dari OMDb API
        const filmsData = await Promise.all(
          titles.map(async (title) => {
            const omdbRes = await fetch(`https://www.omdbapi.com/?apikey=7ff896bb&t=${encodeURIComponent(title)}`);
            return omdbRes.json();
          })
        );

        setFilms(filmsData);
      } catch (err) {
        setError("Server / OMDb API gagal diakses");
      }
    };

    fetchWatchlist();
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Watchlist</h1>
      {error && <p className="text-red-400 mb-2">{error}</p>}
      {films.length === 0 && !error ? (
        <p>Belum ada film di watchlist.</p>
      ) : (
        <ul className="space-y-3">
          {films.map((film, idx) => (
            <li
              key={idx}
              className="flex items-center bg-gray-800 rounded-lg shadow overflow-hidden"
            >
              <img
                src={
                  film.Poster !== "N/A"
                    ? film.Poster
                    : "https://via.placeholder.com/80x120?text=No+Image"
                }
                alt={film.Title}
                className="w-20 h-28 object-cover"
              />
              <div className="p-3">
                <h2 className="text-lg font-semibold text-white">{film.Title}</h2>
                <p className="text-gray-400">{film.Year}</p>
                <p className="text-sm text-gray-300 line-clamp-3">{film.Plot}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

}
