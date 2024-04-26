import React, { useState } from "react";
import NavBar from "./NavBar";
import "../css/Dashboard.css";
import firebase from "./firebaseConfig";
import { useEffect } from "react";
const Dashboard = () => {
	// Sample current user information (replace this with actual data from Firebase)
	const [userInfo, setUserInfo] = useState({
		email: "", // Populate with current email
		password: "", // Populate with placeholder or keep empty for security
		dorm: "", // Populate with current dorm
		height: "", // Populate with current height
		weight: "", // Populate with current weight
	});
	const user = firebase.auth().currentUser;

	useEffect(() => {
		if (user) {
			const unsubscribe = firebase
				.firestore()
				.collection("users") // Assuming 'users' is your collection
				.doc(user.uid) // Document ID, typically the user's UID
				.onSnapshot((doc) => {
					if (doc.exists) {
						setUserInfo(doc.data());
					} else {
						console.log("No user data available");
					}
				});
			return () => unsubscribe(); // Cleanup subscription on unmount
		}
	}, [user]);

	const handleUpdateField = (field, value) => {
		if (user) {
			firebase
				.firestore()
				.collection("users")
				.doc(user.uid)
				.update({ [field]: value })
				.then(() => console.log("User data updated"))
				.catch((error) =>
					console.error("Error updating user data: ", error)
				);
		}
	};

	// Event handlers for edit buttons (to be implemented with Firebase logic)
	const handleEditEmail = () => {
		/* Logic to edit email */
	};
	const handleEditPassword = () => {
		/* Logic to edit password */
	};
	const handleEditDorm = () => {
		/* Logic to edit dorm */
	};
	const handleEditPersonalDetails = () => {
		/* Logic to edit personal details */
	};

	return (
		<>
			<NavBar />
			<div className="dashboard-container">
				<h2>Account Dashboard</h2>
				<div className="info-group">
					<div className="info-label">Email:</div>
					<div className="info-value">
						{userInfo.email || "Not set"}
					</div>
					<button onClick={handleEditEmail}>Edit</button>
				</div>
				<div className="info-group">
					<div className="info-label">Password:</div>
					<div className="info-value">{"********"}</div>
					<button onClick={handleEditPassword}>Edit</button>
				</div>
				<div className="info-group">
					<div className="info-label">Dorm:</div>
					<div className="info-value">
						{userInfo.dorm || "Not set"}
					</div>
					<button onClick={handleEditDorm}>Edit</button>
				</div>
				<div className="info-group personal-details">
					<div className="info-label">Height:</div>
					<div className="info-value">
						{userInfo.height || "Not set"}
					</div>
					<div className="info-label">Weight:</div>
					<div className="info-value">
						{userInfo.weight || "Not set"}
					</div>
					<button onClick={handleEditPersonalDetails}>Edit</button>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
