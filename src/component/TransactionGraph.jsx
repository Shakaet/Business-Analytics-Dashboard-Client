import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const TransactionsGraph = ({ transactions }) => {
 
  const formattedData = transactions.map((tx) => ({
    name: tx.userName,
    amount: tx.amount,
  }));

  return (
    <div className="p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-black mb-3">Transaction Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#4CAF50" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsGraph;
