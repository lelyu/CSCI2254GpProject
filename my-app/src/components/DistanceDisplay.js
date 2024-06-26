import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../css/DistanceDisplay.css"; 

const DistanceDisplay = ({ apiKey, userZipCode }) => {
    const [userDistanceKm, setUserDistanceKm] = useState(0);
    const [distanceToNewYork, setDistanceToNewYork] = useState(null);
    const [completionCount, setCompletionCount] = useState(0);
    const [totalSteps, setTotalSteps] = useState(0); // State to store total steps
    const newYorkCoords = { lat: 40.7128, lng: -74.0060 }; // New York coordinates

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user && userZipCode) {
            // Fetch user details and calculate distances
            const userRef = doc(db, "users", user.uid);
            getDoc(userRef).then(docSnap => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const steps = data.totalSteps || 0;
                    const meters = steps * 0.8; // Convert steps to meters
                    const kilometers = meters / 1000; // Convert meters to kilometers
                    setUserDistanceKm(kilometers);
                    setCompletionCount(data.completedCycles || 0);
                    setTotalSteps(steps);
                }
            });
            calculateDistanceToNewYork(userZipCode);
        }
    }, [user, userZipCode]);

    const calculateDistanceToNewYork = async (zipCode) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const userCoords = data.results[0].geometry.location;
            const distance = haversineDistance(userCoords, newYorkCoords);
            setDistanceToNewYork(distance);
        } else {
            console.error("No results found for the provided ZIP code");
        }
    };

    // Haversine formula to calculate the distance between two points
    const haversineDistance = (coords1, coords2) => {
        const toRadian = angle => (Math.PI / 180) * angle;
        const earthRadius = 6371; // Radius of the earth in km
        const deltaLat = toRadian(coords2.lat - coords1.lat);
        const deltaLng = toRadian(coords2.lng - coords1.lng);
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(toRadian(coords1.lat)) * Math.cos(toRadian(coords2.lat)) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (earthRadius * c).toFixed(2); // Distance in km
    };

    const ProgressBar = ({ value, max }) => {
        const percentage = (value / max) * 100;
        return (
            <div style={{ width: '100%', backgroundColor: '#ddd' }}>
                <div style={{ width: `${percentage}%`, height: '20px', backgroundColor: 'green' }}>
                    {percentage.toFixed(2)}%
                </div>
            </div>
        );
    };

    return (
        <div className="distance-display-container">
            <p className="details-text">Total steps: <span className="important-figure">{totalSteps}</span></p>
            <p className="details-text">Lifetime distance traveled: <span className="important-figure">{userDistanceKm.toFixed(2)} km</span></p>
            <p className="details-text">Distance to New York, NY from your location: <span className="important-figure">{distanceToNewYork ? `${distanceToNewYork} km` : 'Calculating...'}</span></p>
            <p className="details-text">Times goal completed: <span className="important-figure">{completionCount}</span></p>
            {distanceToNewYork && (
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${(userDistanceKm / parseFloat(distanceToNewYork) * 100).toFixed(2)}%` }}>
                    </div>
                    <div className="progress-text">{((userDistanceKm / parseFloat(distanceToNewYork)) * 100).toFixed(2)}%</div>
                </div>
            )}
        </div>
    );
};

export default DistanceDisplay;
