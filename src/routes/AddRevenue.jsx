import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../provider/AuthProvider";
import useAdmin from "../assets/hook/useAdmin";
import { FaMoon, FaSun } from "react-icons/fa";

const AddRevenue = () => {

  // 
  
  let [isAdmin]= useAdmin()
  console.log(isAdmin)

  let {user}= useContext(Context)

    let link= useNavigate()
  const [formData, setFormData] = useState({
    month: "",
    income: "",
    expense: "",
    email:user?.email
  });

 
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
   
    if ((name === "income" || name === "expense") && value <=0) {
      toast.error(`${name.charAt(0).toUpperCase() + name.slice(1)} cannot be negative or 0!`);
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)

  

    try {
      await axios.post("https://business-dashboard-server.vercel.app/revenue", formData);
      toast.success("Revenue data added successfully!");

      if(isAdmin){
        link("/dashboard/managerevenue")

      }
      else{
        link("/dashboard/myrevenue")
      }
      
      
      setFormData({ month: "", income: "", expense: "" }); // Clear form
    } catch (error) {
      toast.error("Failed to add revenue.");
      console.error(error);
    }
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

  return (
    <div className={`max-w-lg mx-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-white dark:bg-gray-800'}   p-6 rounded-lg shadow-md mt-5`}>
      <h2 className={`text-2xl ${darkMode ? ' text-white' : 'text-gray-800'}  mb-4 text-center font-extrabold`}>Add Revenue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Month Select */}
        <div>
          <label className={`block ${darkMode ? ' text-yellow-600' : 'text-gray-800'}  font-medium`}>Month</label>
          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            required
            className={`w-full p-2 ${darkMode ? ' text-yellow-600' : 'text-gray-800'} border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select Month</option>
            {months.map((m, index) => (
              <option key={index} value={m}>{m}</option>
            ))}
          </select>
        </div>
              {/* Theme Toggle Button */}
     <div className="flex justify-end mb-6 fixed bottom-2 right-6 z-50">
          <button
            onClick={toggleTheme}
            className="p-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 rounded-full shadow-lg transition duration-300"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        {/* Income Input */}
        <div>
          <label className={`block ${darkMode ? ' text-yellow-600' : 'text-gray-800'} font-medium`}>Income</label>
          <input
            type="number"
            name="income"
            value={formData.income}
            onChange={handleChange}
            required
            className={`w-full p-2 border ${darkMode ? ' text-yellow-600' : 'text-gray-800'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter income amount"
          />
        </div>

        {/* Expense Input */}
        <div>
          <label className={`block ${darkMode ? ' text-yellow-600' : 'text-gray-800'} font-medium`}>Expense</label>
          <input
            type="number"
            name="expense"
            value={formData.expense}
            onChange={handleChange}
            required
            className={`w-full p-2 border ${darkMode ? ' text-yellow-600' : 'text-gray-800'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter expense amount"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full font-extrabold ${darkMode ? ' text-white bg-yellow-600 broder-2 border-amber-100' : 'text-black bg-gray-400'}  py-2 rounded-md hover:bg-blue-700 transition`}
        >
          Add Revenue
        </button>
      </form>
    </div>
  );
};

export default AddRevenue;
