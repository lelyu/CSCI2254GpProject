import React, { useState, useEffect } from "react";
import WOW from "wowjs";
import NavBar from "./NavBar";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import "../css/WeightManagement.css";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase"; // Make sure this points to your Firebase configuration

function WeightManagement() {
	const [weight, setWeight] = useState(""); // State for storing user's input weight
	const [weightData, setWeightData] = useState([]); // State for storing weight data as an array
	const auth = getAuth();
	useEffect(() => {
		// Authentication state observer and get user data
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const userRef = doc(db, "users", user.uid);
				getDoc(userRef)
					.then((docSnap) => {
						if (docSnap.exists() && docSnap.data().weights) {
							setWeightData(docSnap.data().weights);
						} else {
							console.log(
								"No weight data available or document does not exist."
							);
						}
					})
					.catch((error) => {
						console.error("Error fetching weight data:", error);
					});
			} else {
				// Load weight data from local storage if not logged in
				const storedWeightData = localStorage.getItem("weightData");
				if (storedWeightData) {
					setWeightData(JSON.parse(storedWeightData));
				}
			}
		});

		// Initialize WOW.js animations
		new WOW.WOW({
			boxClass: "wow",
			animateClass: "animated",
			offset: 0,
			mobile: false,
			live: true,
		}).init();

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);
	// const auth = getAuth();
	// const user = auth.currentUser;
	// // Effect hook to load weight data from local storage
	// useEffect(() => {
	// 	if (!user) {
	// 		const storedWeightData = localStorage.getItem("weightData");
	// 		if (storedWeightData) {
	// 			setWeightData(JSON.parse(storedWeightData));
	// 		}
	// 	} else {
	// 		const userRef = doc(db, "users", user.uid);
	// 		getDoc(userRef)
	// 			.then((docSnap) => {
	// 				if (docSnap.exists() && docSnap.data().weights) {
	// 					setWeightData(docSnap.data().weights);
	// 				} else {
	// 					console.log(
	// 						"No weight data available or document does not exist."
	// 					);
	// 				}
	// 			})
	// 			.catch((error) => {
	// 				console.error("Error fetching weight data:", error);
	// 			});
	// 	}

	// 	new WOW.WOW({
	// 		boxClass: "wow", // Default CSS class for Wow.js animations
	// 		animateClass: "animated", // Default CSS class for animation library (animate.css)
	// 		offset: 0, // Change this value to adjust the viewport offset for triggering animations
	// 		mobile: false, // Enable animations on mobile devices
	// 		live: true, // Apply changes to the DOM after adding new elements
	// 	}).init();
	// }, []);

	// Function to handle weight submission and update local storage
	// const handleWeightSubmit = () => {
	// 	if (weight !== "") {
	// 		const newWeightData = [
	// 			...weightData,
	// 			{
	// 				date: new Date().toLocaleDateString(),
	// 				weight: parseFloat(weight),
	// 			},
	// 		];
	// 		setWeightData(newWeightData);
	// 		localStorage.setItem("weightData", JSON.stringify(newWeightData)); // Store updated weight data in local storage
	// 		setWeight(""); // Reset the weight input
	// 	}
	// };

	const handleWeightSubmit = () => {
		const auth = getAuth();
		const user = auth.currentUser;

		if (user && weight !== "") {
			const userRef = doc(db, "users", user.uid);
			const newEntry = {
				date: new Date().toLocaleDateString(),
				weight: parseFloat(weight),
			};

			getDoc(userRef).then((docSnap) => {
				if (docSnap.exists()) {
					const existingWeights = docSnap.data().weights || [];
					const updatedWeights = [...existingWeights, newEntry];
					updateDoc(userRef, { weights: updatedWeights })
						.then(() => {
							setWeightData(updatedWeights);
							alert("Weight added successfully!");
							setWeight("");
						})
						.catch((error) => {
							console.error("Error updating weights:", error);
						});
				} else {
					setDoc(userRef, { weights: [newEntry] })
						.then(() => {
							setWeightData([newEntry]);
							alert("New document created and weight added!");
							setWeight("");
						})
						.catch((error) => {
							console.error("Error creating document:", error);
						});
				}
			});
		} else {
			if (weight !== "") {
				const newWeightData = [
					...weightData,
					{
						date: new Date().toLocaleDateString(),
						weight: parseFloat(weight),
					},
				];
				setWeightData(newWeightData);
				localStorage.setItem(
					"weightData",
					JSON.stringify(newWeightData)
				); // Store updated weight data in local storage
				setWeight(""); // Reset the weight input
			}
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
