import React from "react";
import NavBar from "./NavBar";
import GoogleMap from './GoogleMap';


function Homepage() {
	return (
		<div className= "container">
			<NavBar />
			<GoogleMap apiKey="AIzaSyDqvqXMzvIFpaIkCMPNh-TmOnMzZymUUAg" />

		</div>
	);
}

export default Homepage;
