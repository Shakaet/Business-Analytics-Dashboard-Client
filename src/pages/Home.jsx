import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.jpg"
import img1 from "../assets/ceo.jpg"
import img2 from "../assets/cto.jpg"
import img3 from "../assets/coo.jpg"
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Home = () => {

   let nav=useNavigate()
  let handleclick=()=>{
    nav("/register")

  }


  let handleC=()=>{
    nav("/dashboard")
  }

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
    <div>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-600 to-purple-600'} text-white`}>
      {/* Hero Section */}
     
     
      <section
  className="h-screen flex flex-col justify-center items-center text-center p-8 bg-cover bg-center"
  style={{ backgroundImage: `url(${banner})` }}
  
>
  <motion.h1
    className="text-5xl font-extrabold  text-[#1E90FF] mb-8"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
     {/* Theme Toggle Button */}
     <div className="flex justify-end mb-6 fixed bottom-2 right-6">
          <button
            onClick={toggleTheme}
            className="p-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 rounded-full shadow-lg transition duration-300"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
    Welcome to Business Analytics Dashboard
    

  </motion.h1>
  <motion.p
    className="text-xl font-extrabold max-w-2xl text-white"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 1 }}
  >
    Get real-time insights into your business performance with our powerful analytics tools.
  </motion.p>
  <motion.button onClick={handleC}
    className="mt-6 px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-blue-200"
    whileHover={{ scale: 1.1 }}
  >
    Get Started
  </motion.button>
</section>

    


     
     

      {/* Features Section */}
      <section className={`p-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}  `}>
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Real-Time Data", "Revenue Tracking", "User Insights", "Secure & Fast", "Custom Reports", "Mobile Friendly"].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex justify-center items-center text-lg font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {feature}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Analytics Overview Section */}
      <section className={`p-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}  text-center`}>
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Business Analytics Overview
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Total Revenue", value: "$1.2M" },
            { title: "Active Users", value: "5,000+" },
            { title: "Monthly Transactions", value: "15K" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-purple-600 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold">{stat.title}</h3>
              <p className="text-3xl font-extrabold">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`p-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "John Doe", feedback: "This dashboard has transformed the way I track business performance!" },
            { name: "Jane Smith", feedback: "Super user-friendly and packed with useful insights." }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black shadow-lg  border-white'} p-6 rounded-lg shadow-lg`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <p className="text-lg">"{testimonial.feedback}"</p>
              <h4 className="font-bold mt-4">{testimonial.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 1️⃣ How It Works Section */}
      <section className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}  p-10  text-black text-center`}>
        <motion.h2 className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Sign Up", desc: "Create an account and set up your business profile." },
            { title: "Connect Data", desc: "Integrate your revenue, transactions, and user data." },
            { title: "Get Insights", desc: "View real-time analytics and reports for business growth." }
          ].map((step, index) => (
            <motion.div key={index} 
              className="bg-blue-500 text-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-lg">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2️⃣ Pricing Plans Section */}
      <section className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}  p-10  text-center`}>
        <motion.h2 className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          Pricing Plans
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Basic", price: "$9.99/mo", features: "Basic analytics & reports." },
            { title: "Pro", price: "$29.99/mo", features: "Advanced features & integrations." },
            { title: "Enterprise", price: "Custom", features: "Full access & priority support." }
          ].map((plan, index) => (
            <motion.div key={index} 
              className="bg-purple-600 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold">{plan.title}</h3>
              <p className="text-4xl font-extrabold">{plan.price}</p>
              <p className="mt-2">{plan.features}</p>
              <button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-300">
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3️⃣ Why Choose Us Section */}
      <section className={` ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} p-10  text-center`}>
        <motion.h2 className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          Why Choose Us?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Real-Time Analytics",
            "Secure & Reliable",
            "AI-Powered Insights",
            "Seamless Integrations"
          ].map((reason, index) => (
            <motion.div key={index} 
              className=" p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <p className="text-lg font-bold">{reason}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
<section className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}  p-10 `}>
  <motion.h2
    className="text-3xl font-bold text-center mb-8"
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    Meet Our Team
  </motion.h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      { name: "Alice Johnson", position: "CEO", img: img1 },
      { name: "Bob Smith", position: "CTO", img: img2 },
      { name: "Charlie Davis", position: "CMO", img: img3 },
    ].map((member, index) => (
      <motion.div
        key={index}
        className="bg-gray-700 p-6 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.2, duration: 0.5 }}
      >
        <img
          src={member?.img}
          alt={member.name}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-sm">{member.position}</p>
      </motion.div>
    ))}
  </div>
</section>

{/* Upcoming Events Section */}
<section className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} p-10 `}>
  <motion.h2
    className="text-3xl font-bold text-center mb-8"
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    Upcoming Events
  </motion.h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { title: "Business Analytics Conference", date: "April 15, 2025" },
      { title: "Data Science Summit", date: "May 5, 2025" },
      { title: "Tech Innovation Expo", date: "June 20, 2025" },
    ].map((event, index) => (
      <motion.div
        key={index}
        className="bg-blue-700 p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.2, duration: 0.5 }}
      >
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="text-lg">{event.date}</p>
      </motion.div>
    ))}
  </div>
</section>
{/* Newsletter Subscription Section */}
<section className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}  p-10  text-center`}>
  <motion.h2
    className="text-3xl font-bold mb-8"
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    Stay Updated with Our Newsletter
  </motion.h2>
  <form className="max-w-lg mx-auto">
    <input
      type="email"
      placeholder="Enter your email"
      className="p-3 mb-4 w-full rounded-lg border-2"
    />
    <motion.button
      type="submit"
      className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md"
      whileHover={{ scale: 1.1 }}
    >
      Subscribe Now
    </motion.button>
  </form>
</section>



      {/* 4️⃣ Recent Blog Posts Section */}
      <section className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}  p-10  text-center`}>
        <motion.h2 className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          Latest Blog Posts
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "How to Boost Business Analytics", date: "March 5, 2025" },
            { title: "5 Key Metrics Every Business Should Track", date: "March 12, 2025" }
          ].map((post, index) => (
            <motion.div key={index} 
              className="bg-blue-500 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-sm">{post.date}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5️⃣ Frequently Asked Questions (FAQs) */}
      <section className={`p-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} text-center`}>
        <motion.h2 className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          {[
            { question: "Is my data secure?", answer: "Yes, we use advanced encryption for security." },
            { question: "Can I cancel anytime?", answer: "Yes, you can cancel your subscription anytime." },
            { question: "Do you offer support?", answer: "Yes, we provide 24/7 customer support." }
          ].map((faq, index) => (
            <motion.div key={index} 
              className="border-b border-gray-300 py-4"
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <h4 className="font-bold">{faq.question}</h4>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

                 {/* Call to Action */}
      <section className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-black'}  p-10  text-center`}>
        <motion.h2
          className="text-3xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Ready to take your business to the next level?
        </motion.h2>
        <motion.p
          className="text-lg text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Join thousands of businesses that trust our platform for real-time analytics.
        </motion.p>
        <motion.button
          onClick={handleclick}
          className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-blue-200"
          whileHover={{ scale: 1.1 }}
        >
          Sign Up Now
        </motion.button>
      </section>



     
    </div>
    </div>
  );
};

export default Home;
