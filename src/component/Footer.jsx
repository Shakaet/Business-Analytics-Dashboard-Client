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
      <a href="/" className="hover:text-indigo-400 transition-colors">About</a>
      <a href="/" className="hover:text-indigo-400 transition-colors">Services</a>
      <a href="/" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
      <a href="/" className="hover:text-indigo-400 transition-colors">Contact</a>
    </div>

    <div className="text-center sm:text-right">
      <p className="text-sm">&copy; {new Date().getFullYear()} DataPulse. All Rights Reserved.</p>
    </div>
  </div>
</footer>

  );
};

export default Footer;
