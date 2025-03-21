import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaMoon, FaStar, FaSun } from "react-icons/fa";
import LoadingSpinner from "../component/LoadingSpinner";
import { Link } from "react-router-dom";

const fetchUsers = async () => {
  const response = await axios.get("https://business-dashboard-server.vercel.app/allfeedback");
  return response.data;
};

const Feedback = () => {
  const { data: feedback = [], isLoading: feedLoading } = useQuery({
    queryKey: ["feedback"],
    queryFn: fetchUsers,
  });

  // Theme State
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  
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
    <div className={`mx-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen w-full p-5 place-items-center place-content-center`}>
      <div className="mt-20">
        <h2 className="text-5xl font-extrabold text-center  dark:text-white mb-6">
          Users Feedback
        </h2>
        <div className="flex justify-end mb-6 fixed bottom-2 right-6 z-50">
              <button
                onClick={toggleTheme}
                className="p-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 rounded-full shadow-lg transition duration-300"
              >
                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            </div>

        {feedLoading ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            <LoadingSpinner />
          </p>
        ) : feedback.length === 0 ? (
          <div className="text-center mt-10">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              No feedback available yet!
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Be the first to share your thoughts. Your feedback matters!
            </p>
            <div className="py-5 px-5">
              <Link
                to={"/dashboard/sendfeedback"}
                className="btn mt-5 text-white text-xl bg-blue-900 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-600"
              >
                Give a Feedback
              </Link>
            </div>
            
            
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {feedback.map((feedback) => (
              <div
                key={feedback._id}
                className={` ${darkMode ? 'bg-gray-900 text-white border-2 border-white' : 'bg-white text-black'}  shadow-lg rounded-lg p-5 flex flex-col items-center text-center transition-transform transform hover:scale-105`}
              >
                <img
                  src={feedback?.photo}
                  alt={feedback.name}
                  className="w-16 h-16 rounded-full shadow-md border-2 border-gray-300"
                />
                <h3 className={`text-lg font-bold ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100  text-gray-900'}    mt-3`}>
                  {feedback.name}
                </h3>
                <p className="text-sm dark:text-gray-300 mt-1">
                  {feedback.email}
                </p>
                <p className="mt-2  dark:text-gray-200">
                  "{feedback.feedback}"
                </p>
                <div className="flex mt-3">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={
                        index < feedback.rating
                          ? "text-yellow-500"
                          : "text-gray-300 dark:text-gray-400"
                      }
                    />
                  ))}
                </div>
              </div>
            ))}

            
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
