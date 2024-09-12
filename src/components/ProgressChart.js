import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Importing the required chart.js components

function ProgressChart() {
  const [progressData, setProgressData] = useState([]);

  // Placeholder progress data, this will be replaced by an API call
  useEffect(() => {
    const placeholderProgress = [
      { date: '2024-09-01', weightLifted: 100 },
      { date: '2024-09-08', weightLifted: 110 },
      { date: '2024-09-15', weightLifted: 120 },
    ];
    setProgressData(placeholderProgress);
  }, []);

  const chartData = {
    labels: progressData.map(p => p.date),
    datasets: [
      {
        label: 'Weight Lifted (kg)',
        data: progressData.map(p => p.weightLifted),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Progress Chart</h2>
      <Line data={chartData} />
    </div>
  );
}

export default ProgressChart;
