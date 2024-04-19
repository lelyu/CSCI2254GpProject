import React, { useState } from 'react';
import CircularContainer from './CircularContainer'; // 导入 CircularContainer 组件

const StepCounter = ({ onStepChange }) => {
    const [steps, setSteps] = useState(''); // 用于跟踪用户输入的步数
    const [distance, setDistance] = useState(''); // 用于跟踪计算出的步行距离
    const [carbonSaved, setCarbonSaved] = useState(0); // 用于跟踪计算出的二氧化碳节省量

    // 处理输入框变化
    const handleChange = (e) => {
        setSteps(e.target.value); // 更新步数
    };

    // 处理表单提交
    const handleSubmit = (e) => {
        e.preventDefault(); // 防止表单默认行为
        onStepChange(steps); // 将步数传递给父组件处理
        // 计算步行距离（假设一步 = 0.8 米）
        const walkingDistance = parseFloat(steps) * 0.8; // 将步数转换为距离
        setDistance(walkingDistance.toFixed(2)); // 设置距离并保留两位小数
        // 计算二氧化碳节省量（假设 1 公里 = 0.27 公斤 CO2 节省）
        const carbonSavedValue = walkingDistance / 1000 * 0.27; // 将米转换为公里并计算 CO2 节省量
        setCarbonSaved(carbonSavedValue.toFixed(2)); // 设置 CO2 节省量并保留两位小数
    };

    // 计算二氧化碳减少的百分比
    const percentageSaved = (carbonSaved / 1) * 100; // 假设 1 公斤 CO2 为 100%

    return (
        <div className="step-counter-container" style={{ margin: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <form onSubmit={handleSubmit}>
                <label>
                    How many steps you walked?
                    <input
                        type="number"
                        value={steps}
                        onChange={handleChange}
                        placeholder="Enter the steps"
                        required
                        style={{ margin: '5px', padding: '5px' }} // 输入框样式
                    />
                </label>
                <button type="submit" style={{ margin: '5px', padding: '5px' }}>Submit</button>
            </form>

            <div>
        Percentage of 1Kg of CO2 you saved
            </div>
            {/* 显示 CircularContainer */}
            <CircularContainer percentageSaved={percentageSaved} style={{ float: 'right', marginLeft: '10px' }} />
        </div>
    );
};

export default StepCounter;
