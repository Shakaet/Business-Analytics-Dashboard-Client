import React, { useEffect, useState } from 'react';
import useRevenue from '../assets/hook/useRevenue';
import useUser from '../assets/hook/useUser';
import useTransection from '../assets/hook/useTransection';
import { FaMoneyBillWave, FaReceipt, FaUsers, FaSun, FaMoon } from 'react-icons/fa';
import Card from '../shared/Card';
import RevenueGraph from '../component/RevenueGraph';
import UserRoleGraph from '../component/UserRoleGraph';
import TransactionGraph from '../component/TransactionGraph';
import ProfitLossGraph from '../component/ProfitLossGraph';
import IncomePieChart from '../component/IncomePieChart';
import ExpensePieChart from '../component/ExpensePieChart';
import AmountType from '../component/AmountType';
import AmountByStatus from '../component/AmountByStatus';

const DashboardHome = () => {
  let [revenue] = useRevenue();
  let [users] = useUser();
  let [transections] = useTransection();
  
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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-3xl p-8 md:p-10 transition-all duration-300`}>
      <div className="container mx-auto">

        {/* Theme Toggle Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleTheme}
            className="p-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 rounded-full shadow-lg transition duration-300"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">
          <Card
            title="Total Accounts Receivable"
            count={`$${revenue.reduce((acc, rev) => acc + Number(rev.income), 0)}`}
            icon={<FaMoneyBillWave />}
            cardColor="bg-gradient-to-r from-blue-500 to-teal-500"
          />
          <Card
            title="Total Accounts Payable"
            count={`$${revenue.reduce((acc, rev) => acc + Number(rev.expense), 0)}`}
            icon={<FaMoneyBillWave />}
            cardColor="bg-gradient-to-r from-red-500 to-yellow-500"
          />
          <Card
            title="Total Users"
            count={users.length}
            icon={<FaUsers />}
            cardColor="bg-gradient-to-r from-green-500 to-lime-500"
          />
          <Card
            title="Total Transactions"
            count={transections.length}
            icon={<FaReceipt />}
            cardColor="bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>

        {/* Pie Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl ring-2 ring-blue-300 dark:ring-blue-600">
            <IncomePieChart data={revenue} />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl ring-2 ring-yellow-300 dark:ring-yellow-600">
            <ExpensePieChart data={revenue} />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl ring-2 ring-green-300 dark:ring-green-600">
            <AmountType transactions={transections} />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl ring-2 ring-purple-300 dark:ring-purple-600">
            <AmountByStatus transactions={transections} />
          </div>
        </div>

        {/* Graphs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl ring-2 ring-teal-300 dark:ring-teal-600">
            <RevenueGraph data={revenue} />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl ring-2 ring-indigo-300 dark:ring-indigo-600">
            <UserRoleGraph users={users} />
          </div>
        </div>

        {/* Transaction and Profit Loss Graphs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl ring-2 ring-pink-300 dark:ring-pink-600">
            <TransactionGraph transactions={transections} />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl ring-2 ring-red-300 dark:ring-red-600">
            <ProfitLossGraph data={revenue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
