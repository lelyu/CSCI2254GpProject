import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

function WeightManagement() {
  const [weight, setWeight] = useState(''); // 用于存储用户输入的体重
  const [weightData, setWeightData] = useState([]); // 用于存储体重数据的状态

  // 从本地存储加载体重数据
  useEffect(() => {
    const storedWeightData = localStorage.getItem('weightData');
    if (storedWeightData) {
      setWeightData(JSON.parse(storedWeightData));
    }
  }, []);

  // 更新体重数据并保存到本地存储
  const handleWeightSubmit = () => {
    if (weight !== '') {
      const newWeightData = [...weightData, { date: new Date().toLocaleDateString(), weight: parseFloat(weight) }];
      setWeightData(newWeightData);
      localStorage.setItem('weightData', JSON.stringify(newWeightData));
      setWeight('');
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight (kg)"
        />
        <button onClick={handleWeightSubmit}>Submit</button>

        {/* 使用 BarChart 组件 */}
        <BarChart data={weightData} />

        {/* 使用 LineChart 组件 */}
        <LineChart data={weightData} />
      </div>
    </div>
  );
}

export default WeightManagement;
