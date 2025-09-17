import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../src/pages/Layout";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Watchlist from "../src/pages/Watchlist";
import Search from "/src/pages/Search";
import "./index.css";
import MovieDetail from "../src/pages/MovieDetail"; // ✅ tambahkan



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Navbar ada di Layout
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/watchlist", element: <Watchlist /> },
      { path: "/Search", element: <Search /> },
      { path: "/movie/:id", element: <MovieDetail /> }, // ✅ tambahkan route ini
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
