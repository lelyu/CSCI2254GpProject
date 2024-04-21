import React, { useState } from 'react';
import NavBar from "./NavBar";
import "../css/Dashboard.css";

const Dashboard = () => {
  // Sample current user information (replace this with actual data from Firebase)
  const [userInfo, setUserInfo] = useState({
    email: '', // Populate with current email
    password: '', // Populate with placeholder or keep empty for security
    dorm: '', // Populate with current dorm
    height: '', // Populate with current height
    weight: '' // Populate with current weight
  });

  // Event handlers for edit buttons (to be implemented with Firebase logic)
  const handleEditEmail = () => { /* Logic to edit email */ };
  const handleEditPassword = () => { /* Logic to edit password */ };
  const handleEditDorm = () => { /* Logic to edit dorm */ };
  const handleEditPersonalDetails = () => { /* Logic to edit personal details */ };

  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <h2>Account Dashboard</h2>
        <div className="info-group">
          <div className="info-label">Email:</div>
          <div className="info-value">{userInfo.email || 'Not set'}</div>
          <button onClick={handleEditEmail}>Edit</button>
        </div>
        <div className="info-group">
          <div className="info-label">Password:</div>
          <div className="info-value">{'********'}</div>
          <button onClick={handleEditPassword}>Edit</button>
        </div>
        <div className="info-group">
          <div className="info-label">Dorm:</div>
          <div className="info-value">{userInfo.dorm || 'Not set'}</div>
          <button onClick={handleEditDorm}>Edit</button>
        </div>
        <div className="info-group personal-details">
          <div className="info-label">Height:</div>
          <div className="info-value">{userInfo.height || 'Not set'}</div>
          <div className="info-label">Weight:</div>
          <div className="info-value">{userInfo.weight || 'Not set'}</div>
          <button onClick={handleEditPersonalDetails}>Edit</button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
