import React from 'react';
import '../css/CircularContainer.css'; // 引入样式文件

const CircularContainer = ({ percentageSaved }) => {
    const isGoalAchieved = percentageSaved === 100; // 判断是否达到目标
    const displayText = percentageSaved > 100 ? 'You win' : `${percentageSaved.toFixed(1)}%`; // 根据条件设置显示文本

    return (
        <div className="circular-container">
            <div
                className="circular-level"
                style={{ transform: `scaleY(${Math.min(percentageSaved, 100) / 100})` }} // 限制最大值为 100%
            ></div>
            {isGoalAchieved && (
                <p className="goal-message">You achieved the goal</p>
            )}
            <p className="percentage-text">{displayText}</p> {/* 显示百分比或文本 */}
        </div>
    );
};

export default CircularContainer;
