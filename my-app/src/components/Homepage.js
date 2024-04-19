// Homepage.js
import React, { useState } from "react";
import NavBar from "./NavBar";
import Intro from "./Intro";
import GoogleMap from "./GoogleMap";
import StepCounter from "./StepCounter";
import ZipCodeInput from "./ZipCodeInput";
import { useEffect } from "react";
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

	
	return (
		<div className="container">
			<NavBar />
			{/* Pass user input ZIP code to GoogleMap component */}
			<Intro />
			<GoogleMap
				apiKey="AIzaSyDqvqXMzvIFpaIkCMPNh-TmOnMzZymUUAg"
				zipCode={userZipCode}
			/>
			<StepCounter onStepChange={handleStepChange} />
			<ZipCodeInput onZipCodeSubmit={handleZipCodeSubmit} />
		</div>
	);
}

export default Homepage;
