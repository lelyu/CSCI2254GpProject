import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "../css/Dashboard.css";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  getAuth,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { db } from "../firebase";
import WOW from "wowjs";

// Array of all available dorms
const allDorms = [
  '66 Commonwealth Avenue', 'Cheverus Hall', 'Claver Hall', 'Cushing Hall',
  'Duchesne Hall (East & West)', 'Fenwick Hall', 'Fitzpatrick Hall',
  'Gonzaga Hall', 'Gabelli Hall', 'Greycliff Hall', 'Hardey Hall',
  'Ignacio Hall', 'Keyes Hall (North & South)', 'Kostka Hall', 'Loyola Hall',
  'Medeiros Hall', 'Messina South', 'Messina West', 'Modulars',
  'Ninety St. Thomas More', 'Reservoir Apartments', 'Roncalli Hall',
  'Rubenstein Hall', 'Shaw House', 'Stayer Hall', 'Thomas More Apartments',
  'Vanderslice Hall', 'Voute Hall', 'Walsh Hall', 'Welch Hall',
  'Williams Hall', 'Xavier Hall'
];

const Dashboard = () => {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    dorm: '',
    height: '',
    weight: ''
  });
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setNewEmail(user.email);
      setNewName(user.displayName);

      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        } else {
          setDoc(userRef, {
            ...userInfo,
            displayName: user.displayName,
          });
        }
      });
    }
  }, [user]);

  useEffect(() => {
    new WOW.WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: false,
      live: true,
    }).init();
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
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
      await updateDoc(doc(db, "users", user.uid), userInfo);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  const renderInfoGroup = (label, value, field, type = "text") => (
    <div className="info-group">
      <div className="info-label">{label}:</div>
      {editMode ? (
        field === "dorm" ? (
          <select
            name={field}
            value={value || ''}
            onChange={handleInputChange}
            className="form-control"
          >
            {allDorms.map(dorm => (
              <option key={dorm} value={dorm}>{dorm}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value || ""}
            name={field}
            onChange={handleInputChange}
            className="form-control"
          />
        )
      ) : (
        <span className="info-value">{value || "Not set"}</span>
      )}
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="dashboard-container wow animate__animated animate__zoomIn" data-wow-duration="2s" data-wow-delay="0.1s">
        <h2>Account Dashboard</h2>
        {renderInfoGroup("Email", newEmail, "email", "email")}
        {renderInfoGroup("Password", "********", "password", "password")}
        {renderInfoGroup("Name", newName, "name")}
        {renderInfoGroup("Dorm", userInfo.dorm, "dorm")}
        {renderInfoGroup("Height", userInfo.height, "height")}
        {renderInfoGroup("Weight", userInfo.weight, "weight")}
        
        <button className="btn btn-secondary" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
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
