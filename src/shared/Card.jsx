// Card.js
import React from 'react';

const Card = ({ title, count, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300">
      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  );
};

export default Card;
