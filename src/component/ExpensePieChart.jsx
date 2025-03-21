import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = ({ data }) => {
  const months = data.map((item) => item.month);
  const expenses = data.map((item) => parseFloat(item.expense));

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Expenses",
        data: expenses,
        backgroundColor: [
          "#E53935", "#1E88E5", "#FDD835", "#8BC34A", "#FF7043", "#673AB7", "#009688", "#FFC107",
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
        text: "Expense Distribution by Month",
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
      <h3 className="text-xl font-semibold text-center mb-4 text-black">Expense Breakdown</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default ExpensePieChart;
