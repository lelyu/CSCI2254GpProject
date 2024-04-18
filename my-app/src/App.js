// import cs
import "./App.css";
// import basic things
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import components below
import Homepage from "./components/Homepage";
import Login from "./components/Login";
function App() {
	return (
		<Router>
			<Routes>
				{/* add the routes here */}
				<Route exact path="/" element={<Homepage />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;
