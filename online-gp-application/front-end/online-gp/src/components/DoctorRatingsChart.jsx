import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Continue using Bar
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'; // Import necessary components

// Register the components used in a bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DoctorRatingsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [], // This will be an array of doctor names
    datasets: [{
      label: 'Average Ratings',
      data: [], // This will be an array of ratings
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    }]
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get('http://localhost:8083/api/analytics/doctor-ratings');
        if (response.status === 200 && response.data && response.data.length > 0) {
          // Sort data by rating in descending order
          const sortedData = response.data.sort((a, b) => b.rating - a.rating);
          const labels = sortedData.map(item => item.doctorName);
          const data = sortedData.map(item => item.rating);

          setChartData({
            labels: labels,
            datasets: [{
              label: 'Average Ratings',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }]
          });
        } else {
          setChartData({ labels: [], datasets: [{ data: [] }] });
        }
      } catch (error) {
        console.error('Error fetching doctor ratings', error);
      }
    };

    loadData();
  }, []);

  return (
    <div style={{ height: '450px', width: '40%' }}>
      <h2>Doctor Ratings</h2>
      <Bar data={chartData} options={{
        responsive: true,
        indexAxis: 'y', // Change the axis to horizontal
        scales: { x: { beginAtZero: true } }
      }}/>
    </div>
  );
};

export default DoctorRatingsChart;
