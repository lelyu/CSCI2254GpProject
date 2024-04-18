// import cs
import "./App.css";
// import basic things
import React from "react";
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
// import components below
import Homepage from "./components/Homepage";





function App() {
	return (

	
		<Router>
			<Routes>
				{/* add the routes here */}
				<Route exact path="/" element={<Homepage />} />
			</Routes>
		</Router>


		
	);
}

export default App;
