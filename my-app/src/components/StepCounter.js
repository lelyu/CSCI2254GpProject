import React, { useState } from 'react';

const StepCounter = ({ onStepChange }) => {
    const [steps, setSteps] = useState(''); // Used to track user input of steps
    const [distance, setDistance] = useState(''); // Used to track the calculated walking distance
    const [carbonSaved, setCarbonSaved] = useState(''); // Used to track the calculated carbon dioxide saved

    // Handle input field change
    const handleChange = (e) => {
        setSteps(e.target.value); // Update the steps
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form behavior
        onStepChange(steps); // Pass the steps to the parent component for processing
        // Calculate walking distance (assuming one step = 0.8 meters)
        const walkingDistance = parseFloat(steps) * 0.8; // Convert steps to distance
        setDistance(walkingDistance.toFixed(2)); // Set the distance and keep two decimal places
        // Calculate carbon dioxide saved (assuming 1 km = 0.27 kg CO2 saved)
        const carbonSavedValue = walkingDistance / 1000 * 0.27; // Convert meters to kilometers and calculate CO2 saved
        setCarbonSaved(carbonSavedValue.toFixed(2)); // Set the CO2 saved and keep two decimal places
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                How many steps you walked today?
                <input
                    type="number"
                    value={steps}
                    onChange={handleChange}
                    placeholder="Type steps"
                    required
                />
            </label>
            <button type="submit">Submit</button>
            {/* Display the walking distance */}
            {distance && <p>You have: {distance} meters</p>}
            {/* Display the carbon dioxide saved */}
            {carbonSaved && <p>You saved: {carbonSaved} kg of CO2</p>}
        </form>
    );
};

export default StepCounter;
