// Homepage.js
import React, { useState } from "react";
import NavBar from "./NavBar";
import Intro from "./Intro";
import Tree from "./Tree";
import Mission from "./Mission";
import Earth from "./Earth";
import GoogleMap from "./GoogleMap";
import StepCounter from "./StepCounter";
import ZipCodeInput from "./ZipCodeInput";
import { useEffect } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { app } from "../firebase";
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

			<div className="row">
				{/* Intro */}
				<div className="col-md-6 animate__animated animate__fadeInLeft">
					<Intro />
				</div>
				{/* Tree */}
				<div className="col-md-6 animate__animated animate__fadeInRight">
					<Tree />
				</div>
			</div>

			<div className="row">
				{/* Mission */}
				<div className="col-md-6 animate__animated animate__fadeInLeft">
					<Mission />
				</div>
				{/* Earth */}
				<div className="col-md-6 animate__animated animate__fadeInRight">
					<Earth />
				</div>
			</div>

			<div className="row">
				<div className="col-md-6">
					<div className="col animate__animated animate__fadeInLeft animate__slower">
						<StepCounter onStepChange={handleStepChange} />
					</div>
				</div>
				<div className="col-md-6">
					<div className="row">
						<div className="col animate__animated animate__fadeInLeft animate__slower">
							<ZipCodeInput
								onZipCodeSubmit={handleZipCodeSubmit}
							/>
						</div>
					</div>
					{/* GoogleMap */}
					<div className="row">
						<div className="animate__animated animate__fadeInRight animate__slower">
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
