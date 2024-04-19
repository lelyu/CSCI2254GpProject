import React from 'react';
import '../css/CircularContainer.css'; // 引入样式文件

const CircularContainer = ({ percentageSaved }) => {


    return (
        <div className="circular-container">

            <div
                className="circular-level"
                style={{ transform: `scaleY(${percentageSaved / 100})` }}
            ></div>

<p className="percentage-text">{percentageSaved.toFixed(1)}%</p> 

        </div>
    );
};

export default CircularContainer;
