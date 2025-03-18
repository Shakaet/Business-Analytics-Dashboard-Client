import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const { user } = useContext(Context);

  let nav=useNavigate()

  const [transaction, setTransaction] = useState({
    userName: user?.displayName || "", // Set fixed username
    amount: "",
    type: "payment",
    status: "completed",
    email:user?.email,
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      ...transaction,
      amount: parseFloat(transaction.amount), 
      date: new Date(), 
    };

    // console.log(newTransaction);

    try {
      const response = await axios.post("http://localhost:3000/transactions", newTransaction);
      toast.success("Transection added successfully!");
      nav("/dashboard/mytransection")
    //   console.log("Transaction added:", response.data);
      setTransaction({ ...transaction, amount: "", type: "payment", status: "completed" });
    } catch (error) {
        toast.error("Failed to add transection.");
      alert("Failed to add transaction!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Add Transaction</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Fixed User Name */}
          <div>
            <label className="block text-gray-700 font-medium">User Name</label>
            <input
              type="text"
              name="userName"
              value={user?.displayName || "Guest User"}
              className="w-full text-black mt-2 p-2 border rounded-lg bg-gray-200 "
              readOnly // Makes username fixed & uneditable
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
              className="w-full text-black mt-2 p-2 border rounded-lg focus:ring focus:ring-indigo-300"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-gray-700 font-medium">Type</label>
            <select
              name="type"
              value={transaction.type}
              onChange={handleChange}
              className="w-full mt-2 p-2 text-black border rounded-lg focus:ring focus:ring-indigo-300"
            >
              <option value="payment">Payment</option>
              <option value="refund">Refund</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-black font-medium">Status</label>
            <select
              name="status"
              value={transaction.status}
              onChange={handleChange}
              className="w-full mt-2 p-2 text-black border rounded-lg focus:ring focus:ring-indigo-300"
            >
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-black py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
