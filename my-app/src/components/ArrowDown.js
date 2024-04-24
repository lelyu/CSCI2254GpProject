import React from "react";
import ArrowDown from '../images/arrowdown.gif';
import "../css/ArrowDown.css";


const Earth = () => {
    return (
        <div className="arrowdown-container">
            <img src={ArrowDown} alt="Earth" className="arrowdown-img" />
        </div>
    );
};

export default Earth;
