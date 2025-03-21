import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

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

  // Theme State
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // Toggle Theme
  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      ...transaction,
      amount: parseFloat(transaction.amount), 
      date: new Date(), 
    };


    



    // console.log(newTransaction);

    try {
      const response = await axios.post("https://business-dashboard-server.vercel.app/transactions", newTransaction);
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
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl  text-center mb-6 text-gray-900 font-extrabold">Add Transaction</h2>

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
            className="w-full bg-gray-900 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Add Transaction
          </button>
        </form>

                {/* Theme Toggle Button */}
     <div className="flex justify-end mb-6 fixed bottom-2 right-6 z-50">
          <button
            onClick={toggleTheme}
            className="p-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 rounded-full shadow-lg transition duration-300"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
