import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "../css/Dashboard.css";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

const Dashboard = () => {
	const [editMode, setEditMode] = useState(false);
	const [userInfo, setUserInfo] = useState({
		dorm: null, // initially null, to be set by user
		height: null, // initially null, to be set by user
		weight: null, // initially null, to be set by user
	});

	const auth = getAuth();
	const user = auth.currentUser;

	useEffect(() => {
		if (user) {
			const userRef = doc(db, "users", user.uid);
			getDoc(userRef).then((docSnap) => {
				if (docSnap.exists()) {
					setUserInfo(docSnap.data());
				} else {
					// Document does not exist, so let's set it with initial values
					setDoc(userRef, userInfo);
				}
			});
		}
	}, [user]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserInfo({ ...userInfo, [name]: value ? value : null });
	};

	const saveUserInfo = () => {
		if (user) {
			const userRef = doc(db, "users", user.uid);
			setDoc(userRef, userInfo, { merge: true }) // merge true will update only the provided fields
				.then(() => {
					setEditMode(false);
					alert("Profile updated successfully!");
				})
				.catch((error) => {
					console.error("Error updating profile: ", error);
				});
		}
	};

	// Render function to switch between view and edit mode
	const renderInfoGroup = (label, value, field) => (
		<div className="info-group">
			<div className="info-label">{label}:</div>
			{editMode ? (
				<input
					type={field === "email" ? "email" : "text"}
					value={value === null ? "" : value} // if value is null, show an empty string
					name={field}
					onChange={handleInputChange}
					className="form-control"
				/>
			) : (
				<div className="info-value">{value || "Not set"}</div>
			)}
		</div>
	);

	return (
		<>
			<NavBar />
			<div className="dashboard-container">
				<h2>Account Dashboard</h2>
				{renderInfoGroup("Email", user?.email, "email")}
				<div className="info-group">
					<div className="info-label">Password:</div>
					<div className="info-value">{"********"}</div>
					{/* Add password change logic */}
				</div>
				{renderInfoGroup("Dorm", userInfo.dorm, "dorm")}
				{renderInfoGroup("Height", userInfo.height, "height")}
				{renderInfoGroup("Weight", userInfo.weight, "weight")}
				<button
					className="btn btn-primary"
					onClick={() => setEditMode(!editMode)}>
					{editMode ? "Save Changes" : "Edit Profile"}
				</button>
				{editMode && (
					<button
						className="btn btn-secondary"
						onClick={saveUserInfo}>
						Save
					</button>
				)}
			</div>
		</>
	);
};

export default Dashboard;
