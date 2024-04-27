import React, { useState, useEffect } from "react";
import WOW from "wowjs";
import NavBar from "./NavBar";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import "../css/WeightManagement.css";

function WeightManagement() {
	const [weight, setWeight] = useState(""); // State for storing user's input weight
	const [weightData, setWeightData] = useState([]); // State for storing weight data as an array

	// Effect hook to load weight data from local storage
	useEffect(() => {
		const storedWeightData = localStorage.getItem("weightData");
		if (storedWeightData) {
			setWeightData(JSON.parse(storedWeightData));
		}

		new WOW.WOW({
			boxClass: "wow", // Default CSS class for Wow.js animations
			animateClass: "animated", // Default CSS class for animation library (animate.css)
			offset: 0, // Change this value to adjust the viewport offset for triggering animations
			mobile: false, // Enable animations on mobile devices
			live: true, // Apply changes to the DOM after adding new elements
		}).init();
	}, []);

	// Function to handle weight submission and update local storage
	const handleWeightSubmit = () => {
		if (weight !== "") {
			const newWeightData = [
				...weightData,
				{
					date: new Date().toLocaleDateString(),
					weight: parseFloat(weight),
				},
			];
			setWeightData(newWeightData);
			localStorage.setItem("weightData", JSON.stringify(newWeightData)); // Store updated weight data in local storage
			setWeight(""); // Reset the weight input
		}
	};

	return (
		<div className="container-fluid">
			<div className="Navbar-row">
				<NavBar />
			</div>
			<div
				className="row wow animate__animated animate__fadeInDown"
				data-wow-duration="3s"
				data-wow-delay="0.2s">
				<div className="title">Weight Managment</div>
			</div>

			<div className="row">
				<div
					className="col-md-6 wow animate__animated animate__fadeInLeft"
					data-wow-duration="3s"
					data-wow-delay="0.2s">
					<BarChart data={weightData} />
				</div>
				<div
					className="col-md-6 wow animate__animated animate__fadeInRight"
					data-wow-duration="3s"
					data-wow-delay="0.2s">
					<LineChart data={weightData} />
				</div>
			</div>

			<div className="row">
				<input
					type="number"
					value={weight}
					onChange={(e) => setWeight(e.target.value)}
					placeholder="Enter weight (kg)"
				/>
				<button
					type="submit"
					className="btn btn-outline-success"
					onClick={handleWeightSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
}

export default WeightManagement;
