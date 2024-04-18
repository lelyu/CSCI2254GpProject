import React, { useEffect } from "react";
import "../css/NavBar.css";

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
			<nav className="navbar navbar-inverse">
				<div className="container-fluid d-flex justify-content-between">
					<a
						id="len1"
						className="nav-link hoverable step-venture"
						href="#">
						Step Venture
					</a>
					<div className="nav-links">
						<a id="len2" className="nav-link hoverable" href="#">
							About
						</a>
						<a id="len3" className="nav-link hoverable" href="#">
							Weight Management
						</a>
						<a id="len4" className="nav-link hoverable" href="#">
							Login/SignUp
						</a>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
