import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomePieChart = ({ data }) => {
  const months = data.map((item) => item.month);
  const incomes = data.map((item) => parseFloat(item.income));

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: incomes,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#F44336", "#9C27B0", "#00BCD4", "#FF9800",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Income Distribution by Month",
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-center mb-4 text-black">Income Breakdown</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default IncomePieChart;
