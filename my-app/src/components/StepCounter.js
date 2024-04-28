import "../css/StepCounter.css"; // 导入你的 CSS 文件
import People from "../images/people.gif";
import React, { useState } from "react";
import CircularContainer from "./CircularContainer"; // 导入 CircularContainer 组件
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
// Evidence
import { db } from "../firebase";

const StepCounter = ({ onStepChange }) => {
  const [steps, setSteps] = useState(""); // 用于跟踪用户输入的步数
  const [distance, setDistance] = useState(""); // 用于跟踪计算出的步行距离
  const [carbonSaved, setCarbonSaved] = useState(0); // 用于跟踪计算出的二氧化碳节省量

  const auth = getAuth();
  const user = auth.currentUser;

  const handleChange = (e) => {
    setSteps(e.target.value); // 更新步数
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleFileChange = (event) => {
      setFile(event.target.files[0]); // 设置文件
    };

    const handleUploadEvidence = () => {
      if (!file) {
        alert("Please select a file first!");
        return;
      }

      const fileRef = ref(storage, `evidence/${user.uid}/${file.name}`);
      uploadBytes(fileRef, file)
        .then((snapshot) => {
          alert("Evidence uploaded successfully!");
          setFile(null); // 重置文件
        })
        .catch((error) => {
          console.error("Error uploading evidence: ", error);
          alert("Error uploading file!");
        });
    };

    // Calculate walking distance and carbon saved regardless of user login
    const walkingDistance = parseFloat(steps) * 0.8; // Assuming one step = 0.8 meters
    const carbonSavedValue = (walkingDistance / 1000) * 0.27; // Assuming 1 km = 0.27 kg CO2 saved

    setDistance(walkingDistance.toFixed(2)); // Set the distance and round to 2 decimal places
    setCarbonSaved(carbonSavedValue.toFixed(2)); // Set the CO2 saved and round to 2 decimal places

    // Only save to Firestore if the user is logged in
    if (user) {
      const userRef = doc(db, "users", user.uid);
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          // Get the current steps array from the Firestore document
          const currentSteps = docSnap.data().steps || [];
          // Append the new step count to the existing array
          const updatedSteps = [...currentSteps, parseInt(steps)];
          // Update the Firestore document with the new array
          await updateDoc(userRef, { steps: updatedSteps });
          alert("Steps added successfully!");
          setSteps(""); // Reset steps input after submitting
        } else {
          // Document does not exist, so create it with initial steps
          await setDoc(userRef, {
            steps: [parseInt(steps)],
          });
          alert("New user document created and steps added!");
          setSteps(""); // Reset steps input after submitting
        }
      } catch (error) {
        console.error("Error updating steps: ", error);
      }
    } else {
      // If the user is not logged in, you can still call onStepChange if you have additional processing there
      onStepChange?.(steps);
    }
  };

  // 计算二氧化碳减少的百分比
  const percentageSaved = (carbonSaved / 1) * 100; // 假设 1 公斤 CO2 为 100%

  return (
    <div className="step-counter-container">
      <form onSubmit={handleSubmit}>
        <label>How many steps did you take today?</label>

        <input
          type="number"
          value={steps}
          onChange={handleChange}
          placeholder="Enter the steps"
          required
        />

        <button
          type="submit"
          className="btn btn-outline-success"
          style={{ marginTop: "17px", marginLeft: "-120px" }}
        >
          Submit
        </button>
      </form>

      <div className="row info">
        <div className="col-md-6 ">
          <div className="walking-distance">
            <p>You have walked {distance ? `${distance} meters` : ""}</p>

            <img
              src={People}
              alt="Description of Image"
              className="side-image wow fadeInLeft"
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="percentage-saved">
            <p>Percentage of 1 Kg of CO2 you saved</p>
            <CircularContainer percentageSaved={percentageSaved} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCounter;
