import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Colors for different statuses

const AmountByStatus = ({ transactions }) => {
  // Grouping transactions by status and summing amounts
  const statusData = transactions.reduce((acc, tx) => {
    const existingStatus = acc.find((item) => item.name === tx.status);
    if (existingStatus) {
      existingStatus.value += parseFloat(tx.amount);
    } else {
      acc.push({ name: tx.status, value: parseFloat(tx.amount) });
    }
    return acc;
  }, []);

  return (
    <div className="p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-black mb-3 text-center">Amount by Status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label>
            {statusData.map((entry, index) => (
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

export default AmountByStatus;
