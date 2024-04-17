import React, { useEffect } from "react";
import "./NavBar.css";

const NavBar = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            const str = '#len'; //increment by 1 up to 1-nelemnts
            let i = 1;
            const stop = 4; //num elements
            if (i > stop) {
                clearInterval(interval);
            }
            const element = document.getElementById('len' + (i++));
            element.addEventListener('mouseenter', () => {
                element.classList.add('bounce');
            });
            element.addEventListener('mouseleave', () => {
                element.classList.remove('bounce');
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <a id="len1" className="nav-link hoverable" href="#">Home</a>
                    <a id="len2" className="nav-link hoverable" href="#">About</a>
                    <a id="len3" className="nav-link hoverable" href="#">Portfolio</a>
                    <a id="len4" className="nav-link hoverable" href="#">Contact</a>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;


