import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>D TECH</h2>
      <div className="nav-links">
        <Link to="/">Tabel Pengguna</Link>
        <Link to="/form">Tambah/Edit Pengguna</Link>
      </div>
    </nav>
  );
};

export default Navbar;
