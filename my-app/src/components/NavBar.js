import React, { useEffect } from "react";
import "../css/NavBar.css";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { useState } from "react";
const NavBar = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      let i = 1;
      const stop = 4;
      if (i > stop) {
        clearInterval(interval);
      }
      const element = document.getElementById("len" + i++);
      element.addEventListener("mouseenter", () => {
        element.classList.add("bounce");
      });
      element.addEventListener("mouseleave", () => {
        element.classList.remove("bounce");
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // currentUser will be null if no user is logged in
      console.log(currentUser);
    });

    return () => unsubscribe();
  }, []);

  function handleSignOut() {
    const auth = getAuth(app);
    auth
      .signOut()
      .then(() => {
        // After successfully signing out, refresh the page
        window.location.reload();
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Sign out error:", error);
      });
  }

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid d-flex justify-content-between">
          <Link to="/" id="len1" className="nav-link hoverable step-venture">
            Step Venture
          </Link>

          <div className="nav-links">
            <Link to="/about" id="len2" className="nav-link hoverable">
              About
            </Link>

            {/* Weight Managment Link */}
            <Link
              to="/weightmanagement"
              id="len3"
              className="nav-link hoverable"
            >
              Weight Managment
            </Link>

            {/* Conditionally render Dashboard link if user is logged in */}
            {user && (
              <Link to="/dashboard" id="len4" className="nav-link hoverable">
                Dashboard
              </Link>
            )}

            {user ? (
              // Display user's name (or another identifier) and sign-out option
              <>
                <span className="navbar-text mr-2" style={{ color: "#e3f2fd" }}>
                  Hello, {user.displayName}
                </span>
                <button
                  onClick={handleSignOut}
                  className="nav-link hoverable"
                  id="len5"
                >
                  Sign Out
                </button>
              </>
            ) : (
              // Display Login/SignUp link
              <Link to="/login" id="len5" className="nav-link hoverable">
                Login/SignUp
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
