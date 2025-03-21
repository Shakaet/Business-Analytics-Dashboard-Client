import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { FaMoon, FaSun, FaStar } from "react-icons/fa";
import { Context } from "../provider/AuthProvider";

const Addfeedback = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    feedback: "",
    rating: 0,
    email: user?.email,
    name:user?.displayName,
    photo:user?.photoURL
  });

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Rating Click
  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    if (!formData.feedback || formData.rating === 0) {
      toast.error("Please provide feedback and a rating!");
      return;
    }

    try {
      await axios.post("https://business-dashboard-server.vercel.app/addfeedback", formData);
      toast.success("Feedback submitted successfully!");
      navigate("/feedback");
      setFormData({ feedback: "", rating: 0 });
    } catch (error) {
      toast.error("Failed to submit feedback.");
      console.error(error);
    }
  };

  // Theme Toggle
  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`max-w-lg mx-auto ${darkMode ? "bg-gray-900 text-white" : "bg-white"} p-6 rounded-lg shadow-md mt-5`}>
      <h2 className={`text-2xl ${darkMode ? "text-white" : "text-gray-800"} mb-4 text-center font-extrabold`}>
        Give Your Feedback
      </h2>
      
      {/* Theme Toggle */}
      <div className="flex justify-end mb-6 fixed bottom-2 right-6 z-50">
        <button onClick={toggleTheme} className="p-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 rounded-full shadow-lg transition duration-300">
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Feedback Textarea */}
        <div>
          <label className={`block ${darkMode ? "text-yellow-600" : "text-gray-800"} font-medium`}>
            Your Feedback
          </label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
            className={`w-full p-2 border ${darkMode ? "text-yellow-600" : "text-gray-800"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Write your feedback..."
            rows="4"
          ></textarea>
        </div>

        {/* Rating System */}
        <div>
          <label className={`block ${darkMode ? "text-yellow-600" : "text-gray-800"} font-medium`}>
            Rating
          </label>
          <div className="flex space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={25}
                onClick={() => handleRating(star)}
                className={`cursor-pointer transition duration-300 ${star <= formData.rating ? "text-yellow-500" : "text-gray-400"}`}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full font-extrabold ${darkMode ? "text-white bg-yellow-600 border-2 border-amber-100" : "text-black bg-gray-400"} py-2 rounded-md hover:bg-blue-700 transition`}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Addfeedback;
