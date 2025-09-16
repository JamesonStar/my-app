// src/pages/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="">
        <Outlet /> {/* tempat route children akan dirender */}
      </div>
    </>
  );
}
