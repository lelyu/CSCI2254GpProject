import React, { useState, useEffect, useRef } from "react";
import NavBar from "./NavBar";
import Chart from 'chart.js/auto';

function WeightManagement() {
  const [weight, setWeight] = useState(''); // 用于存储用户输入的体重
  const [weightData, setWeightData] = useState([]); // 用于存储体重数据的状态
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);

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

  // 绘制条形统计图
useEffect(() => {
    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext('2d');
      if (ctx) {
        // 销毁之前的图表实例
        if (barChartRef.current.chart) {
          barChartRef.current.chart.destroy();
        }
        // 创建新的图表实例
        barChartRef.current.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: weightData.map(item => item.date),
            datasets: [{
              label: 'Weight (kg)',
              data: weightData.map(item => item.weight),
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Weight (kg)'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Date'
                }
              }
            }
          }
        });
      }
    }
  }, [weightData]);
  
  // 绘制折线统计图
  useEffect(() => {
    if (lineChartRef.current) {
      const ctx = lineChartRef.current.getContext('2d');
      if (ctx) {
        // 销毁之前的图表实例
        if (lineChartRef.current.chart) {
          lineChartRef.current.chart.destroy();
        }
        // 创建新的图表实例
        lineChartRef.current.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: weightData.map(item => item.date),
            datasets: [{
              label: 'Weight (kg)',
              data: weightData.map(item => item.weight),
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              fill: false
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Weight (kg)'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Date'
                }
              }
            }
          }
        });
      }
    }
  }, [weightData]);
  

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

        <div>
          <h2>Bar Chart</h2>
          <canvas id="barChart" ref={barChartRef} width="400" height="200"></canvas>
        </div>

        <div>
          <h2>Line Chart</h2>
          <canvas id="lineChart" ref={lineChartRef} width="400" height="200"></canvas>
        </div>
      </div>
    </div>
  );
}

export default WeightManagement;
