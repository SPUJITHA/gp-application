import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import '../components/ChartConfig.jsx';

const AppointmentTrendsChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8083/api/analytics/appointment-trends');
        if (response.status === 200 && response.data && response.data.length > 0) {
          const dayCounts = new Array(7).fill(0); // Array to store counts for each day of the week
          const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

          // Aggregate counts by day of the week
          response.data.forEach(item => {
            const day = new Date(item.appointmentDate).getDay(); // Get day index from date
            dayCounts[day] += item.count; // Increment count for this day
          });

          const chartData = {
            labels: daysOfWeek, // Use predefined day labels
            datasets: [{
              label: 'Number of Appointments',
              data: dayCounts,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }]
          };
          setChartData(chartData);
        } else {
          setChartData({ labels: [], datasets: [] });
        }
      } catch (error) {
        console.error('Error fetching appointment data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: '350px', width: '50%' }}>
      <h2>Appointment Trends</h2>
      <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default AppointmentTrendsChart;
