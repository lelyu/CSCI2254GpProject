import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import "../css/WeightManagement.css";

function WeightManagement() {
  const [weight, setWeight] = useState(""); // State for storing user's input weight
  const [weightData, setWeightData] = useState([]); // State for storing weight data as an array

  // Effect hook to load weight data from local storage
  useEffect(() => {
    const storedWeightData = localStorage.getItem("weightData");
    if (storedWeightData) {
      setWeightData(JSON.parse(storedWeightData));
    }
  }, []);

  // Function to handle weight submission and update local storage
  const handleWeightSubmit = () => {
    if (weight !== "") {
      const newWeightData = [
        ...weightData,
        { date: new Date().toLocaleDateString(), weight: parseFloat(weight) },
      ];
      setWeightData(newWeightData);
      localStorage.setItem("weightData", JSON.stringify(newWeightData)); // Store updated weight data in local storage
      setWeight(""); // Reset the weight input
    }
  };

  return (
    <div className="contianer">
      <NavBar />
      <div className="row">
        <div className="col-md-6">
          <BarChart data={weightData} />
        </div>
        <div className="col-md-6">
          <LineChart data={weightData} />
        </div>
      </div>

      <div className="row">
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight (kg)"
        />
        <button onClick={handleWeightSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default WeightManagement;
