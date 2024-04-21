import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../css/BarChart.css";

function BarChart({ data }) {
  const barChartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: data.map((item) => item.date),
            datasets: [
              {
                label: "Weight (kg)",
                data: data.map((item) => item.weight),
                backgroundColor: "rgba(242, 242, 29, 0.8)",
     

              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Weight (kg)",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Date",
                },
              },
            },
          },
        });
      }
    }
  }, [data]);

  return (
    <div>
      <div className='title'>Weight Progress Chart</div>
      <canvas ref={barChartRef} width="400" height="200"></canvas>
    </div>
  );
}

export default BarChart;
