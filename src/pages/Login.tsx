import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from ".,/src/pages/Navbar"; // <-- IMPORT navbar

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/login", {  // <-- GANTI ke port 5000
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login gagal");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/watchlist");
    } catch (err) {
      setError("Gagal terhubung ke server");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-xl shadow-xl w-80">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          {error && <p className="text-red-400 mb-2">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 p-2 rounded bg-gray-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 rounded bg-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
