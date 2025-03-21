import React from 'react';
import { Pie } from 'react-chartjs-2';  
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const UserRoleGraph = ({ users }) => {

  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1; // Increment the count of the user's role
    return acc;
  }, {});

 
  const chartData = {
    labels: Object.keys(roleCounts), 
    datasets: [
      {
        label: 'User Roles',
        data: Object.values(roleCounts), 
        backgroundColor: ['#4caf50', '#f44336', '#ffeb3b'], 
        borderColor: ['#4caf50', '#f44336', '#ffeb3b'],
        borderWidth: 1,
      },
    ],
  };

  
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw} users`;
          },
        },
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-center text-black">User Role Distribution</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default UserRoleGraph;
