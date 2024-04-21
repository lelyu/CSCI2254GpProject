/* Leaderboard.js */

import "../css/Leaderboard.css";
import React, { useState, useEffect } from "react";
// import { ref, onValue } from 'firebase/database'; // For Firebase integration

// Mock data - this will be replaced with Firebase data
const mockDormData = [
  { dormName: "66 Commonwealth Avenue", totalSteps: 3000 },
  { dormName: "Cheverus Hall", totalSteps: 2500 },
  { dormName: "Claver Hall", totalSteps: 3200 },
  { dormName: "Cushing Hall", totalSteps: 2100 },
  { dormName: "Duchesne Hall (East & West)", totalSteps: 2700 },
  // ... include other dorms as necessary
];

// const dormNames = [
//   '66 Commonwealth Avenue', 'Cheverus Hall', 'Claver Hall', 'Cushing Hall',
//   'Duchesne Hall (East & West)', 'Fenwick Hall', 'Fitzpatrick Hall',
//   'Gonzaga Hall', 'Gabelli Hall', 'Greycliff Hall', 'Hardey Hall',
//   'Ignacio Hall', 'Keyes Hall (North & South)', 'Kostka Hall', 'Loyola Hall',
//   'Medieros Hall', 'Messina South', 'Messina West', 'Modulars',
//   'Ninety St. Thomas More', 'Reservoir Apartments', 'Roncalli Hall',
//   'Rubenstein Hall', 'Shaw House', 'Stayer Hall', 'Thomas More Apartments',
//   'Vanderslice Hall', 'Voute Hall', 'Walsh Hall', 'Welch Hall',
//   'Williams Hall', 'Xavier Hall'
// ];

const Leaderboard = () => {
  const [dormScores, setDormScores] = useState([]);

  useEffect(() => {
    // Here we set the mock data to state. In the future, we will fetch this data from Firebase.
    setDormScores(mockDormData);

    // Uncomment the following code when integrating with Firebase
    /*
    const dormsRef = ref(db, 'dorms');
    onValue(dormsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedScores = Object.keys(data).map(dormName => {
        const totalSteps = data[dormName].reduce((acc, user) => acc + user.steps, 0);
        return { dormName, totalSteps };
      });
      setDormScores(loadedScores);
    });
    */
  }, []);

  // Sort dorm scores in descending order
  const sortedDormScores = [...dormScores].sort(
    (a, b) => b.totalSteps - a.totalSteps
  );

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <div className="leaderboard">
        {sortedDormScores.map((dorm, index) => (
          <div
            key={dorm.dormName}
            className={`leaderboard-entry rank-${index + 1}`}
          >
            <span className="dorm-name">{dorm.dormName}</span>
            <span className="total-steps">
              {dorm.totalSteps.toLocaleString()} steps
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
