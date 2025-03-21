import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 px-6">
  <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
    <div className="text-center sm:text-left mb-6 sm:mb-0">
      <h2 className="text-2xl font-semibold mb-2">DataPulse</h2>
      <p className="text-sm">Your go-to platform for business insights and analytics.</p>
    </div>

    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center sm:items-start mb-6 sm:mb-0">
      <a href="/aboutus" className="hover:text-indigo-400 transition-colors">About Us</a>
      <a href="/dashboard" className="hover:text-indigo-400 transition-colors">Dashboard</a>
      <a href="/feedback" className="hover:text-indigo-400 transition-colors">Users Feedback</a>
      <a href="/contactus" className="hover:text-indigo-400 transition-colors">Contact Us</a>
    </div>

    <div className="text-center sm:text-right">
      <p className="text-sm">&copy; {new Date().getFullYear()} DataPulse. All Rights Reserved.</p>
    </div>
  </div>
</footer>

  );
};

export default Footer;
