import React from "react";
import NavBar from "./NavBar";
import GoogleMap from './GoogleMap';
import StepCounter from './StepCounter'; 

function Homepage() {

	// Input steps, pass to the below StepCounter function
    const handleStepChange = (newSteps) => {
        console.log('New steps:', newSteps);
    };

    return (
        <div className= "container">
            <NavBar />
            <GoogleMap apiKey="AIzaSyDqvqXMzvIFpaIkCMPNh-TmOnMzZymUUAg" />
            <StepCounter onStepChange={handleStepChange} />
        </div>
    );
}

export default Homepage;
