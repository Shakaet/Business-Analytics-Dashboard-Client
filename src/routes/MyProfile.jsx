import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const MyProfile = () => {


    const { user } = useContext(Context);


    
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
     <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-[#111827]' : 'bg-gray-300'}   rounded p-6`}>
            {/* Theme Toggle Button */}
     <div className="flex justify-end mb-6 fixed bottom-2 right-6 z-50">
          <button
            onClick={toggleTheme}
            className="p-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 rounded-full shadow-lg transition duration-300"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-yellow/20 backdrop-blur-lg shadow-[0px_10px_30px_rgba(255,255,255,0.2),0px_-10px_30px_rgba(255,255,255,0.2)]">
        <div className="flex flex-col items-center text-center">
          {/* User Image */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="mt-4">
            <h2 className={`text-3xl ${darkMode ? ' text-white' : ' text-black'} font-bold`}>{user?.displayName || "Guest User"}</h2>
            <p className={`text-lg  ${darkMode ? ' text-gray-200' : ' text-black'}  font-bold mt-1`}>{user?.email || "guest@example.com"}</p>
          </div>

          {/* Update Profile Button */}
          <div className="mt-6">
            <Link
              to={"/profile"}
              className={`bg-[#06B6D4]  ${darkMode ? ' text-white' : ' text-black'} font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:shadow-[0px_0px_20px_rgba(255,255,255,0.6)] transition duration-300 transform hover:scale-105`}
            >
              Update Profile
            </Link>
            
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default MyProfile;