import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ background: "#007bff", padding: "10px" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "20px" }}>Home</Link>
      <Link to="/register-patient" style={{ color: "#fff" }}>Register Patient</Link>
    </nav>
  );
};

export default Navbar;
