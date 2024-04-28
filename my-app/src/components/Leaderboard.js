import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import "../css/Leaderboard.css";

const Leaderboard = () => {
  const [dormScores, setDormScores] = useState([]);

  useEffect(() => {
    // Define the query to fetch dorm scores, ordered by totalSteps descending
    const q = query(collection(db, "dorms"), orderBy("totalSteps", "desc"), limit(5));

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const scores = querySnapshot.docs.map(doc => ({
        dormName: doc.id,
        totalSteps: doc.data().totalSteps,
      }));
      setDormScores(scores);
    }, (error) => {
      console.error("Error fetching dorm scores:", error);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <div className="leaderboard">
        {dormScores.map((dorm, index) => (
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
