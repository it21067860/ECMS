import React from "react";
import "./css/LandingPage.css"; // Basic CSS file for styling
import NAV from "./landNav";
//import Foot from "../components/Footer";
import backgroundImage from "../assets/background.png";

function LandingPage() {
    return (
        <div className="flex-container">
            <NAV />
              <div style= {{backgroundImage :`url(${backgroundImage})`,
                               backgroundSize: "cover", // Ensures the image covers the div
                               backgroundPosition: "cove", // Centers the image
                              backgroundRepeat: "no-repeat", }}
                              className="d-flex flex-column justify-content-center align-items-center text-center vh-100">

            <div className="landing-container">
                <div className="header">
                    <h1>Welcome</h1>
                    <p>
                        Providing care and support for those who need.
                    </p>
                </div>

{/*<div className="features">
                    {/* Add features content here if needed 
                </div>*/}

                <div className="cta-buttons">
                    <button className="cta-button primary">Book Now</button>
                    <button className="cta-button secondary">Know More</button>
                </div>

                
              {/*  <Foot />
                  {/*  <div className="social-icons">
                        {/* Add social media icons here if needed *
                    </div>*/}
                
            </div>
        </div>
        </div>
    );
}

export default LandingPage;