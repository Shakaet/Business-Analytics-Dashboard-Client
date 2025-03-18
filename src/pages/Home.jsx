import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {

   let nav=useNavigate()
  let handleclick=()=>{
    nav("/register")

  }


  let handleC=()=>{
    nav("/dashboard")
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center p-8">
        <motion.h1
          className="text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Business Analytics Dashboard
        </motion.h1>
        <motion.p
          className="text-lg max-w-2xl"
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
      <section className="p-10 bg-white text-black">
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
      <section className="p-10 bg-gray-900 text-white text-center">
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
      <section className="p-10 bg-white text-black">
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
              className="bg-gray-200 p-6 rounded-lg shadow-lg"
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
      <section className="p-10 bg-white text-black text-center">
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
      <section className="p-10 bg-gray-900 text-white text-center">
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
      <section className="p-10 bg-white text-black text-center">
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
              className="bg-gray-200 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <p className="text-lg font-bold">{reason}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4️⃣ Recent Blog Posts Section */}
      <section className="p-10 bg-gray-900 text-white text-center">
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
      <section className="p-10 bg-white text-black text-center">
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
      <section className="p-10 bg-gradient-to-r from-purple-600 to-blue-600 text-center">
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
  );
};

export default Home;
