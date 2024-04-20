import React from 'react';
import earth from '../images/earth.gif';
import "../css/Earth.css";

const Earth = () => {
    return (
        <div className="earth-container">
            <img src={earth} alt="Earth" className="earth-image" />
        </div>
    );
};

export default Earth;
