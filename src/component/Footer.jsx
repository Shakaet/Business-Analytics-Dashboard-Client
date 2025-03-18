import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-6 mt-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold mb-2">DataPulse</h2>
          <p className="text-sm">Your go-to platform for business insights and analytics.</p>
        </div>

        <div className="flex space-x-6">
          <a href="/" className="hover:text-indigo-400 transition-colors">About</a>
          <a href="/" className="hover:text-indigo-400 transition-colors">Services</a>
          <a href="/" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
          <a href="/" className="hover:text-indigo-400 transition-colors">Contact</a>
        </div>

        <div className="text-center sm:text-right mt-4 sm:mt-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} DataPulse. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
