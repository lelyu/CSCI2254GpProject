// Homepage.js
import React, { useState } from "react";
import WOW from "wowjs";
import NavBar from "./NavBar";
import Intro from "./Intro";
import Tree from "./Tree";
import Mission from "./Mission";
import Earth from "./Earth";
import ArrowDown from "./ArrowDown";
import DistanceDisplay from "./DistanceDisplay";
import StepCounter from "./StepCounter";
import ZipCodeInput from "./ZipCodeInput";
import Leaderboard from "./Leaderboard";
import bcLogo from "../images/bc-logo.png";
import { useEffect } from "react";

import "../css/Homepage.css";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";

// import { useNavigate } from "react-router-dom";
function Homepage() {
  
  const [userZipCode, setUserZipCode] = useState(""); // Store user input ZIP code
  
  // Handle user input ZIP code
  const handleZipCodeSubmit = (zipCode) => {
    setUserZipCode(zipCode); // Update user input ZIP code
  };


  // Input steps, pass to the below StepCounter function
  const handleStepChange = (newSteps) => {
    console.log("New steps:", newSteps);
  };

  useEffect(() => {
    new WOW.WOW({
      boxClass: "wow", // Default CSS class for Wow.js animations
      animateClass: "animated", // Default CSS class for animation library (animate.css)
      offset: 0, // Change this value to adjust the viewport offset for triggering animations
      mobile: false, // Enable animations on mobile devices
      live: true, // Apply changes to the DOM after adding new elements
    }).init();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div className="container-fluid">
      <div className="Navbar-row">
        <NavBar />
      </div>

      <div className="row">
        {/* Intro */}
        <div
          className="col-md-6 wow animate__animated animate__fadeInLeft"
          data-wow-duration="3s"
          data-wow-delay="0.2s"
        >
          <Intro />
        </div>
        {/* Tree */}
        <div
          className="col-md-6 wow animate__animated animate__fadeInRight"
          data-wow-duration="3s"
          data-wow-delay="0.2s"
        >
          <Tree />
        </div>
      </div>

      <div className="row">
        <div
          className="col-md-6 wow animate__animated animate__fadeInLeft"
          data-wow-duration="3s"
          data-wow-delay="0.2s"
        >
          <Earth />
        </div>
        {/* Mission */}
        <div
          className="col-md-6 wow animate__animated animate__fadeInRight"
          data-wow-duration="3s"
          data-wow-delay="0.2s"
        >
          <Mission />
        </div>
      </div>

      <div className="row">
        <div
          className="col wow animate__animated animate__fadeInLeft"
          data-wow-duration="3s"
          data-wow-delay="0.3s"
        >
          <ArrowDown />
        </div>
        <div
          className="col wow animate__animated animate__fadeInDown"
          data-wow-duration="3s"
          data-wow-delay="0.3s"
        >
          <ArrowDown />
        </div>
        <div
          className="col wow animate__animated animate__fadeInRight"
          data-wow-duration="3s"
          data-wow-delay="0.3s"
        >
          <ArrowDown />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div
            className="col wow animate__animated animate__fadeInLeft "
            data-wow-duration="2s"
            data-wow-delay="0.3s"
          >
            <StepCounter onStepChange={handleStepChange} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="zip-code">
            <div
              className="col wow animate__animated animate__fadeInRight"
              data-wow-duration="2s"
              data-wow-delay="0.3s"
            >
              <ZipCodeInput
                onZipCodeSubmit={handleZipCodeSubmit}
                label="User Zip Code:"
              />
            </div>
          </div>
          {/* GoogleMap */}
          <div className="google-map">
            <div
              className="col wow animate__animated animate__fadeInRight"
              data-wow-duration="2s"
              data-wow-delay="0.3s"
            >
              <DistanceDisplay
                apiKey="AIzaSyDqvqXMzvIFpaIkCMPNh-TmOnMzZymUUAg"
                userZipCode={userZipCode}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div
          className="col wow animate__animated animate__fadeInLeft"
          data-wow-duration="3s"
          data-wow-delay="0.3s"
        >
          <ArrowDown />
        </div>
        <div
          className="col wow animate__animated animate__fadeInDown"
          data-wow-duration="3s"
          data-wow-delay="0.3s"
        >
          <ArrowDown />
        </div>
        <div
          className="col wow animate__animated animate__fadeInRight"
          data-wow-duration="3s"
          data-wow-delay="0.3s"
        >
          <ArrowDown />
        </div>
      </div>

      {/* Leaderboard section */}
      <div className="content-row">
        <div
          className="col wow animate__animated animate__fadeInLeft animate__slower"
          data-wow-duration="2s"
          data-wow-delay="0.3s"
        >
          <Leaderboard />
        </div>

        <div
          className="col wow animate__animated animate__fadeInRight animate__slower"
          data-wow-duration="2s"
          data-wow-delay="0.3s"
        >
          <img src={bcLogo} alt="BC_logo" />
        </div>
      </div>

      <div className="content-row">
        <div className="copyright">
          <p>Copyright © 2024-2025 Step Venture All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
