import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import"../css/LineChart.css";

function LineChart({ data }) {
    // useRef is a hook, create a reference that can store the variables persistently that won't be lost between different renders of the component
  const lineChartRef = useRef(null);
    // use useRef to store the chart instance, avoide repeatition
  const chartInstance = useRef(null);



    //Use useEffect to progress Chart Initialization and update
        // Handle the operation of side effects
            // Indirectly influence the rendering outcome of a component
  useEffect(() => {
    //When canvas elements has already rendered and existed, then do the operation
    if (lineChartRef.current) {
        // get the 2D canvas element
      const ctx = lineChartRef.current.getContext('2d');
      if (ctx) {


        // If there is already had a chart instance, then destroy it first, avoid the internal storage leakage
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        // Create a new chart instance, store in ChartInstance
        chartInstance.current = new Chart(ctx, {
          type: 'line', 
          data: {
            labels: data.map(item => item.date), //x-axis
            datasets: [{
              label: 'Weight (kg)',
              data: data.map(item => item.weight),
              borderColor: 'rgb(255, 99, 132)',
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
  }, [data]);

  return (
    <div>
      <div className="title">Weight Trend Chart</div>
      <canvas ref={lineChartRef} width="400" height="200"></canvas>
    </div>
  );
}

export default LineChart;
