import React from "react";
import "./NavBar.css";

const NavBar = () => {
    const handleHover = (event) => {
        const element = event.target;
        element.classList.add('bounce');
        setTimeout(() => {
            element.classList.remove('bounce');
        }, 2000); // 2秒后移除bounce类
    };

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <a id="len1" className="nav-link hoverable" href="#" onMouseEnter={handleHover}>Home</a>
                    <a id="len2" className="nav-link hoverable" href="#" onMouseEnter={handleHover}>About</a>
                    <a id="len3" className="nav-link hoverable" href="#" onMouseEnter={handleHover}>Portfolio</a>
                    <a id="len4" className="nav-link hoverable" href="#" onMouseEnter={handleHover}>Contact</a>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
