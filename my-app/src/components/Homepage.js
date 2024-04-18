// Homepage.js
import React, { useState } from 'react';
import NavBar from './NavBar';
import GoogleMap from './GoogleMap';
import StepCounter from './StepCounter';
import ZipCodeInput from './ZipCodeInput';

function Homepage() {
    
    const [userZipCode, setUserZipCode] = useState(''); // Store user input ZIP code
   

    // Handle user input ZIP code
    const handleZipCodeSubmit = (zipCode) => {
        setUserZipCode(zipCode); // Update user input ZIP code
    };


    // Input steps, pass to the below StepCounter function
    const handleStepChange = (newSteps) => {
        console.log('New steps:', newSteps);
    };

    return (
        <div className="container">
            <NavBar />
            {/* Pass user input ZIP code to GoogleMap component */}
            <GoogleMap apiKey="AIzaSyDqvqXMzvIFpaIkCMPNh-TmOnMzZymUUAg" zipCode={userZipCode}  />
            <StepCounter onStepChange={handleStepChange} />
            <ZipCodeInput onZipCodeSubmit={handleZipCodeSubmit} />
        </div>
    );
}

export default Homepage;
