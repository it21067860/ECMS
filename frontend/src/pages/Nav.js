import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import "./css/nav.css"; // Import CSS for styling
import Register from "./Register";

// Placeholder components for each route
function Home() {
  return <div className="content-text">Welcome to the Home Page</div>;
}

function About() {
  return <div className="content-text">About Us</div>;
}

function Loans() {
  return <div className="content-text">Loans</div>;
}

function Factoring() {
  return <div className="content-text">Factoring</div>;
}

function Rsp() {
  return <div className="content-text">RSP</div>;
}

function Docu() {
  return <div className="content-text">Documentation</div>;
}

function Blog() {
  return <div className="content-text">Blog</div>;
}

function Login() {
  return <div className="content-text">Login Page</div>;
}

function SignUp() {
  return <div className="content-text">Sign Up Page</div>;
}

function Nav() {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="nav">
        <div className="nav-logo">
          <Link to="/" className="nav-item">
            <span className="nav-text">SafeHeaven</span>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/home" className="nav-item">
            <span className="nav-text">Home</span>
          </Link>
          <Link to="/about" className="nav-item">
            <span className="nav-text">About Us</span>
          </Link>
          <Link to="/services" className="nav-item">
            <span className="nav-text">Services</span>
          </Link>
          <Link to="/contact" className="nav-item">
            <span className="nav-text">Contact Us</span>
          </Link>
          <Link to="/blog" className="nav-item">
            <span className="nav-text">Blog</span>
          </Link>
        </div>

        <div className="nav-search">
          <input type="text" placeholder="Search" className="search-bar" />
        </div>

        {/* Login and Sign Up Buttons */}
        <div className="nav-auth">
          <Link to="/login" className="nav-item">
            <span className="nav-text">Login</span>
          </Link>
          <Link to="/reg" className="nav-item">
            <span className="nav-text">Sign Up</span>
          </Link>
        </div>
        <div>
          {/* Profile */}
          <Link to="/profile" className="nav-item">
            <span className="nav-text">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Content Area */}
      <div className="content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/factoring" element={<Factoring />} />
          <Route path="/rsp" element={<Rsp />} />
          <Route path="/docu" element={<Docu />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default Nav;