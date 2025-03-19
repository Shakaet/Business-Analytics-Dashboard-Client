import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateRevenue = () => {

  let link=useNavigate()

    let {id}=useParams()
  const [formData, setFormData] = useState({
    month: "",
    income: "",
    expense: "",
  });
//   console.log(id)
  

  // List of Months for Dropdown
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Fetch existing revenue data to pre-fill the form
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/revenue/${id}`);
        setFormData(response.data); // Set formData with fetched data
      } catch (error) {
        toast.error("Failed to fetch revenue data.");
        console.error(error);
      }
    };
    if (id) fetchRevenueData(); // Only fetch if revenueId exists
  }, [id]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative numbers
    if ((name === "income" || name === "expense") && value < 0) {
      toast.error(`${name.charAt(0).toUpperCase() + name.slice(1)} cannot be negative!`);
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    try {
      await axios.patch(`http://localhost:3000/revenue/${id}`, formData);
      
      toast.success("Revenue data updated successfully!");

      link("/dashboard/managerevenue")
    } catch (error) {
      toast.error("Failed to update revenue.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Update Revenue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Month Select */}
        <div>
          <label className="block text-gray-700 font-medium">Month</label>
          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Month</option>
            {months.map((m, index) => (
              <option key={index} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Income Input */}
        <div>
          <label className="block text-gray-700 font-medium">Income</label>
          <input
            type="number"
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter income amount"
          />
        </div>

        {/* Expense Input */}
        <div>
          <label className="block text-gray-700 font-medium">Expense</label>
          <input
            type="number"
            name="expense"
            value={formData.expense}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter expense amount"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Revenue
        </button>
      </form>
    </div>
  );
};

export default UpdateRevenue;
