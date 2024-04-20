import React, { useEffect } from "react";
import "../css/NavBar.css";
import { Link } from "react-router-dom";

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

	return (
		<div className="container-fluid">
			<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="container-fluid d-flex justify-content-between">
					<Link
						to="/"
						id="len1"
						className="nav-link hoverable step-venture">
						Step Venture
					</Link>

					<div className="nav-links">
						<a id="len2" className="nav-link hoverable" href="#">
							About
						</a>

						{/* Weight Managment Link */}
						<Link
							to="/weightmanagement"
							id="len3"
							className="navlink hoverable">
							Weight Managment
						</Link>
						<Link
							to="/login"
							id="len4"
							className="nav-link hoverable">
							Login/SignUp
						</Link>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
