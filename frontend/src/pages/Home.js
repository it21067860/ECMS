
import React from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";
import NAV from "./Nav";

const Home = () => {
  return (
    <div className="flex-container">
      <NAV />
      <div className="home-container">
        <h1 className="home-heading">Welcome to Safe Heaven</h1>
        <p className="home-subtext">Providing care and support for those in need.</p>
      </div>

        {/*<div className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/register-patient" className="nav-link">Register Patient</Link>
          <Link to="/view-patients" className="nav-link">View Patients</Link>
          <Link to="/register-doner" className="nav-link">Register Donor</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </div>*/}

        <div className="services-container">
      
          <div className="service-card">
            <h3>Patient Registration</h3>
            <p>Register new patients to our system to provide them with the care and support they need.</p>
            <Link to="/register-patient" className="service-link">Learn More</Link>
          </div>

          <div className="service-card">
            <h3>Elder/Children Home Registration</h3>
            <p>Register Elder/Children Home to our system to provide them with the care and support they need.</p>
            <Link to="/register-Home" className="service-link">Learn More</Link>
          </div>
          
          <div className="service-card">
            <h3>Volunteer Registration</h3>
            <p>Join our team of dedicated volunteers to help support those in need in our community.</p>
            <Link to="/volunteer" className="service-link">Learn More</Link>
          </div>
          
          <div className="service-card">
            <h3>Donation</h3>
            <p>Become a donor and help us continue our mission of providing care and support.</p>
            <Link to="/donation" className="service-link">Learn More</Link>
          </div>
        </div>
        
        
      </div>
 
  );
};

export default Home;