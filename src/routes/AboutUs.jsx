import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const AboutUs = () => {


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

  // Apply theme class to <html> tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <section className={` ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}  py-16 px-6 md:px-12`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center mt-20"
      >
        <h2 className={`text-4xl font-bold ${darkMode ? 'bg-gray-900 text-white' : 'text-blue-400'}  mb-4`}>About Us</h2>
        <p className={`text-lg ${darkMode ? 'bg-gray-900 text-white' : ' text-black font-bold'} `}>
          Welcome to <span className={`  ${darkMode ? 'bg-gray-900 text-white' : ' text-blue-400'} font-semibold`}>DataPulse Dashboard</span>, your trusted platform for real-time business analytics and data-driven decision-making. Our intuitive dashboard helps businesses track key performance indicators, analyze trends, and optimize strategies for growth.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center mt-12 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-gray-800 rounded-lg p-6 w-64 text-center shadow-lg"
          >
            <h3 className="text-3xl font-semibold text-blue-400">{stat.value}+</h3>
            <p className="text-gray-300">{stat.label}</p>
          </motion.div>
        ))}

           {/* Theme Toggle Button */}
     <div className="flex justify-end mb-6 fixed bottom-2 right-6">
          <button
            onClick={toggleTheme}
            className="p-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 rounded-full shadow-lg transition duration-300"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      </div>
    </section>
  );
};

const stats = [
  { value: "500", label: "Companies Using Our Dashboard" },
  { value: "95%", label: "Client Satisfaction Rate" },
  { value: "10K", label: "Analytics Reports Generated" },
];

export default AboutUs;
