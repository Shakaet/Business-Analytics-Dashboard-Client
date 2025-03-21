import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#4CAF50", "#F44336", "#2196F3", "#FF9800"]; // Colors for different types

const AmountType = ({ transactions }) => {
  // Grouping transactions by type and summing amounts
  const typeData = transactions.reduce((acc, tx) => {
    const existingType = acc.find((item) => item.name === tx.type);
    if (existingType) {
      existingType.value += parseFloat(tx.amount);
    } else {
      acc.push({ name: tx.type, value: parseFloat(tx.amount) });
    }
    return acc;
  }, []);

  return (
    <div className="p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-black mb-3 text-center">Amount by Type</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
            {typeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AmountType;
