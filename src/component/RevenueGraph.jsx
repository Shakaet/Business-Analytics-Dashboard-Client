import React from 'react';
import { Bar } from 'react-chartjs-2';  
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueGraph = ({ data }) => {
 
  const months = data.map(item => item.month);
  const incomes = data.map(item => parseFloat(item.income));
  const expenses = data.map(item => parseFloat(item.expense));


  const chartData = {
    labels: months, 
    datasets: [
      {
        label: 'Income',
        data: incomes,
        backgroundColor: '#4caf50', 
        borderColor: '#4caf50',
        borderWidth: 1,
      },
      {
        label: 'Expense',
        data: expenses, 
        backgroundColor: '#f44336',
        borderColor: '#f44336',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Revenue vs Expense Over Months',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `$${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `$${value}`; // Display value as currency
          },
        },
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-center">Revenue vs Expense Over Time</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueGraph;
