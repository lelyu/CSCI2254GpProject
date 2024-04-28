import React, { useState, useEffect } from "react";
import CircularContainer from "./CircularContainer";
import People from "../images/people.gif";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import "../css/StepCounter.css"; 


const StepCounter = ({ onStepChange }) => {
  const [steps, setSteps] = useState("");
  const [distance, setDistance] = useState("");
  const [carbonSaved, setCarbonSaved] = useState(0);
  const [file, setFile] = useState(null);
  const [userInfo, setUserInfo] = useState({ dorm: '', height: '', weight: '' });

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserInfo(docSnap.data()); // Set userInfo from Firestore
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setSteps(e.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadEvidence = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const fileRef = ref(storage, `evidence/${user.uid}/${file.name}`);
    uploadBytes(fileRef, file).then((snapshot) => {
      alert("Evidence uploaded successfully!");
      setFile(null);
    }).catch((error) => {
      console.error("Error uploading evidence: ", error);
      alert("Error uploading file!");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const walkingDistance = parseFloat(steps) * 0.8; // Assuming one step = 0.8 meters
    const carbonSavedValue = (walkingDistance / 1000) * 0.27; // Assuming 1 km = 0.27 kg CO2 saved

    setDistance(walkingDistance.toFixed(2));
    setCarbonSaved(carbonSavedValue.toFixed(2));

    if (user && userInfo.dorm) {
      const userRef = doc(db, "users", user.uid);
      const dormRef = doc(db, "dorms", userInfo.dorm);

      // Check if the dorm document exists and update or create it
      const dormDocSnap = await getDoc(dormRef);
      if (dormDocSnap.exists()) {
        await updateDoc(dormRef, {
          totalSteps: increment(parseInt(steps))
        });
      } else {
        await setDoc(dormRef, {
          totalSteps: parseInt(steps)
        });
      }

      // Update or create user document
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        await updateDoc(userRef, {
          steps: increment(parseInt(steps))
        });
      } else {
        await setDoc(userRef, {
          steps: [parseInt(steps)]
        });
      }

      alert("Steps added successfully!");
      setSteps(""); // Reset steps input after submitting
    }
  };

  const percentageSaved = (carbonSaved / 1) * 100;

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
				<button type="submit" className="btn btn-outline-success">
					Submit
				</button>
			</form>

      <div className="row info">
        <div className="col-md-6">
          <div className="walking-distance">
            <p>You have walked {distance ? `${distance} meters` : ""}</p>
            <img
              src={People}
              alt="Walking Person Animation"
              className="side-image wow fadeInLeft"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="percentage-saved">
            <p>Percentage of 1 Kg of CO2 you saved</p>
            <div className="circular">
            <CircularContainer percentageSaved={percentageSaved} />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCounter;