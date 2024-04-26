import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "../css/Dashboard.css";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
	getAuth,
	updateProfile,
	updateEmail,
	updatePassword,
	EmailAuthProvider,
	reauthenticateWithCredential,
} from "firebase/auth";
import { db } from "../firebase";

const Dashboard = () => {
	const [editMode, setEditMode] = useState(false);
	const [userInfo, setUserInfo] = useState({
		dorm: null,
		height: null,
		weight: null,
	});
	const [newEmail, setNewEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newName, setNewName] = useState("");

	const auth = getAuth();
	const user = auth.currentUser;

	useEffect(() => {
		if (user) {
			// Initialize new fields with user's current information
			setNewEmail(user.email);
			setNewName(user.displayName);

			const userRef = doc(db, "users", user.uid);
			getDoc(userRef).then((docSnap) => {
				if (docSnap.exists()) {
					setUserInfo(docSnap.data());
				} else {
					// Document does not exist, create it with initial user info
					setDoc(userRef, {
						...userInfo,
						displayName: user.displayName, // store displayName if it's available
					});
				}
			});
		}
	}, [user]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserInfo({ ...userInfo, [name]: value ? value : null });
	};

	const handleUpdateEmail = async () => {
		try {
			await updateEmail(user, newEmail);
			alert("Email updated successfully!");
		} catch (error) {
			console.error("Error updating email:", error);
			alert(error.message);
		}
	};

	const handleUpdatePassword = async () => {
		try {
			await updatePassword(user, newPassword);
			alert("Password updated successfully!");
		} catch (error) {
			console.error("Error updating password:", error);
			alert(error.message);
		}
	};

	const handleUpdateName = async () => {
		try {
			await updateProfile(user, { displayName: newName });
			alert("Display name updated successfully!");
			// Also update Firestore user document with new displayName
			await updateDoc(doc(db, "users", user.uid), {
				displayName: newName,
			});
		} catch (error) {
			console.error("Error updating display name:", error);
			alert(error.message);
		}
	};

	const saveUserInfo = async () => {
		try {
			await updateDoc(doc(db, "users", user.uid), { ...userInfo });
			setEditMode(false);
			alert("Profile updated successfully!");
		} catch (error) {
			console.error("Error updating profile: ", error);
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

				{/* Editable fields for user's personal information */}
				{editMode ? (
					<>
						<div className="info-group">
							<div className="info-label">Email:</div>
							<input
								type="email"
								className="form-control"
								value={newEmail}
								onChange={(e) => setNewEmail(e.target.value)}
								placeholder="New email"
							/>
							<button
								onClick={handleUpdateEmail}
								className="btn btn-primary">
								Update Email
							</button>
						</div>

						<div className="info-group">
							<div className="info-label">Password:</div>
							<input
								type="password"
								className="form-control"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								placeholder="New password"
							/>
							<button
								onClick={handleUpdatePassword}
								className="btn btn-primary">
								Update Password
							</button>
						</div>

						<div className="info-group">
							<div className="info-label">Display Name:</div>
							<input
								type="text"
								className="form-control"
								value={newName}
								onChange={(e) => setNewName(e.target.value)}
								placeholder="New display name"
							/>
							<button
								onClick={handleUpdateName}
								className="btn btn-primary">
								Update Display Name
							</button>
						</div>
					</>
				) : (
					<>
						<div className="info-group">
							<div className="info-label">Email:</div>
							<div className="info-value">
								{user?.email || "Not set"}
							</div>
						</div>

						<div className="info-group">
							<div className="info-label">Display Name:</div>
							<div className="info-value">
								{user?.displayName || "Not set"}
							</div>
						</div>

						{/* Password cannot be displayed */}
						<div className="info-group">
							<div className="info-label">Password:</div>
							<div className="info-value">{"********"}</div>
						</div>
					</>
				)}

				{/* User's other editable information */}
				{renderInfoGroup("Dorm", userInfo.dorm, "dorm")}
				{renderInfoGroup("Height", userInfo.height, "height")}
				{renderInfoGroup("Weight", userInfo.weight, "weight")}

				{/* Toggle edit mode */}
				<button
					className="btn btn-secondary"
					onClick={() => setEditMode(!editMode)}>
					{editMode ? "Cancel" : "Edit Profile"}
				</button>

				{/* Save button shows only in edit mode */}
				{editMode && (
					<button className="btn btn-primary" onClick={saveUserInfo}>
						Save Changes
					</button>
				)}
			</div>
		</>
	);
};

export default Dashboard;
