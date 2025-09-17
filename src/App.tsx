import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Watchlist from "./pages/Watchlist";
import Footer from "./pages/Footer"; // ✅ pastikan sudah ada file ini
import { AuthProvider } from "./context/AuthContext";  // 👈 import



function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b1220] text-white">
      {/* Navbar di atas */}
      <Navbar />

      {/* Area konten halaman */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      {/* Footer di bawah */}
      <Footer />
    </div>
  );
}

export default App;
