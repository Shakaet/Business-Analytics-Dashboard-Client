import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaSun, FaMoon } from "react-icons/fa";
import contactImg from "../assets/contact.jpg"; // Replace with your image path
import { useEffect, useState } from "react";

const ContactUs = () => {


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
    <div className={`min-h-screen flex flex-col md:flex-row items-center justify-center p-6 ${darkMode ? 'bg-[#111827]' : 'bg-gray-300'}  `}>
      {/* Left Side - Contact Image */}
      <div className="md:w-1/2 flex justify-center items-center mt-15">
        <img
          src={contactImg}
          alt="Contact Us"
          className="w-full max-w-sm rounded-3xl shadow-lg transform transition duration-500 hover:scale-105"
        />
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

      {/* Right Side - Contact Form */}
      <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white dark:bg-gray-800'}  max-w-lg w-full  shadow-xl rounded-3xl p-8 space-y-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl md:w-1/2 mt-20`}>
        <h1 className="text-4xl font-extrabold text-center  dark:text-white mb-6">
          Get in Touch
        </h1>
        <form className="space-y-6">
          <div>
            <label className="block text-xl font-semibold  dark:text-gray-300">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full p-4 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 text-black shadow-md"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-semibold  dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full p-4 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 text-black shadow-md"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-semibold  dark:text-gray-300">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message here..."
              className="input input-bordered w-full p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 text-black shadow-md"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-8 text-center  dark:text-gray-300 space-y-4">
          <p className="flex items-center justify-center gap-2">
            <FaPhoneAlt className="text-indigo-500" /> +123 456 7890
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaEnvelope className="text-indigo-500" /> support@analyticspro.com
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaMapMarkerAlt className="text-indigo-500" /> 123 Business St, NY, USA
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
