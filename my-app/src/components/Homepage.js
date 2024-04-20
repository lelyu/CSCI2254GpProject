// Homepage.js
import React, { useState } from "react";
import WOW from "wowjs";
import NavBar from "./NavBar";
import Intro from "./Intro";
import Tree from "./Tree";
import Mission from "./Mission";
import Earth from "./Earth";
import GoogleMap from "./GoogleMap";
import StepCounter from "./StepCounter";
import ZipCodeInput from "./ZipCodeInput";
import { useEffect } from "react";

import "../css/Homepage.css";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
// import { useNavigate } from "react-router-dom";
function Homepage() {
  // const navigate = useNavigate();
  // const [user, setUser] = useState(false);

  // useEffect(() => {
  // 	const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
  // 		console.log(user);
  // 		if (!user) {
  // 			navigate("/login");
  // 		}
  // 		setUser(!!user);
  // // 	});

  // 	return () => {
  // 		unsubscribe();
  // 	};
  // }, [user, setUser, navigate]);

  // function handleClick() {
  // 	const auth = getAuth(app);
  // 	auth.signOut();
  // }
  // console.log(user);

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
    <div className="container">
  <NavBar />

  <div className="row">
    {/* Intro */}
    <div className="col-md-6 wow animate__animated animate__fadeInLeft" data-wow-duration="3s" data-wow-delay="0.5s">
      <Intro />
    </div>
    {/* Tree */}
    <div className="col-md-6 wow animate__animated animate__fadeInRight" data-wow-duration="3s" data-wow-delay="0.5s">
      <Tree />
    </div>
  </div>

  <div className="row">
    <div className="col-md-6 wow animate__animated animate__fadeInLeft" data-wow-duration="3s" data-wow-delay="0.5s">
      <Earth />
    </div>
    {/* Mission */}
    <div className="col-md-6 wow animate__animated animate__fadeInRight" data-wow-duration="3s" data-wow-delay="0.5s">
      <Mission />
    </div>
  </div>

  <div className="row">
    <div className="col-md-6">
      <div className="col wow animate__animated animate__fadeInLeft animate__slower" data-wow-duration="2s" data-wow-delay="0.3s">
        <StepCounter onStepChange={handleStepChange} />
      </div>
    </div>
    <div className="col-md-6">
      <div className="row">
        <div className="col wow animate__animated animate__fadeInLeft animate__slower" data-wow-duration="2s" data-wow-delay="0.3s">
          <ZipCodeInput onZipCodeSubmit={handleZipCodeSubmit} />
        </div>
      </div>
      {/* GoogleMap */}
      <div className="row">
        <div className="col wow animate__animated animate__fadeInRight animate__slower" data-wow-duration="2s" data-wow-delay="0.3s">
          <GoogleMap
            apiKey="AIzaSyDqvqXMzvIFpaIkCMPNh-TmOnMzZymUUAg"
            zipCode={userZipCode}
          />
        </div>
      </div>
    </div>
  </div>
</div>


  );
}

export default Homepage;
