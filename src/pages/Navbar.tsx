// src/pages/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // cek token untuk login/logout

  const handleLogout = () => {
    localStorage.removeItem("token"); // hapus token JWT
    navigate("/login"); // redirect ke login
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🎬 MovieApp</h1>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/search" className="hover:text-blue-400">Search</Link>
        {token ? (
          <>
            <Link to="/watchlist" className="hover:text-blue-400">Watchlist</Link>
            <button
              onClick={handleLogout}
              className="hover:text-red-400"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-blue-400">Login</Link>
        )}
      </div>
    </nav>
  );
}
