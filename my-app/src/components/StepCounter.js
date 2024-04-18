import React, { useState } from 'react';

const StepCounter = ({ onStepChange }) => {
    const [steps, setSteps] = useState(''); // Used to track user input of steps
    const [distance, setDistance] = useState(''); // Used to track the calculated walking distance

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
            {distance && <p>You have walked: {distance} meters</p>}
        </form>
    );
};

export default StepCounter;
