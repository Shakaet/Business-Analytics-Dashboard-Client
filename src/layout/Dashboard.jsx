import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaMoneyBillWave, FaChartLine, FaUsers, FaUser } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Context } from "../provider/AuthProvider";

const Dashboard = () => {

  const { user, signOuts } = useContext(Context);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  let nav= useNavigate()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    signOuts();

    nav("/login")
    
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative w-64 bg-gray-900 text-white p-5 space-y-4 flex flex-col transition-transform duration-300 ease-in-out z-50`}
      >
        <h2 className="text-2xl font-semibold text-center text-yellow-400">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <Link to="/dashboard" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
            <FaHome className="text-yellow-400" />
            <span>Dashboard Home</span>
          </Link>
          <Link to="/dashboard/addrevenue" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
            <FaMoneyBillWave className="text-green-400" />
            <span>Add Revenue</span>
          </Link>
          <Link to="/dashboard/managerevenue" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
            <FaChartLine className="text-blue-400" />
            <span>Manage Revenue</span>
          </Link>
          <Link to="/dashboard/manageuser" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
            <FaUsers className="text-red-400" />
            <span>Manage Users</span>
          </Link>
          <Link to="/dashboard/myprofile" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
            <FaUser className="text-purple-400" />
            <span>My Profile</span>
          </Link>
          <Link to="/" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
            <AiFillHome className="text-purple-400" />
            <span>Home</span>
          </Link>
          <Link  onClick={handleLogout} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
            <RiLogoutBoxFill className="text-purple-400" />  
            <span>Logout</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden mb-4 p-2 bg-gray-900 text-white rounded-md"
        >
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>

        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
        <div className="mt-4 bg-white p-5 rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
