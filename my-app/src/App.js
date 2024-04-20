// import cs
import "./App.css";
// import basic things
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import components below
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import WeightManagement from "./components/WeightManagement";


function App() {
	return (
		<Router>
			<Routes>
				{/* add the routes here */}
				<Route exact path="/" element={<Homepage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/weightmanagement" element={<WeightManagement />} />
			</Routes>
		</Router>
	);
}

export default App;
