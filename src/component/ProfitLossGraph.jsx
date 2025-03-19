import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProfitLossGraph = ({ data }) => {
  // Extracting months, income, and expense
  const months = data.map((item) => item.month);
  const profits = data.map((item) => parseFloat(item.income) - parseFloat(item.expense));
  const losses = profits.map((profit) => (profit < 0 ? Math.abs(profit) : 0)); // Only show negative values as losses

  // Chart Data
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Profit",
        data: profits.map((profit) => (profit > 0 ? profit : 0)), // Show only positive profit
        backgroundColor: "#2196F3", // Blue for profit
        borderColor: "#1E88E5",
        borderWidth: 1,
      },
      {
        label: "Loss",
        data: losses, // Show only loss values
        backgroundColor: "#FF5722", // Red for loss
        borderColor: "#E64A19",
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
        text: "Monthly Profit & Loss",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `$${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-center mb-4">Profit & Loss Over Time</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ProfitLossGraph;
