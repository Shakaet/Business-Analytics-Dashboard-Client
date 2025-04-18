import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaMoneyBillWave, FaChartLine, FaUsers, FaUser, FaHandsHelping, FaSun, FaMoon } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { RiLogoutBoxFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { Context } from "../provider/AuthProvider";
import useAdmin from "../assets/hook/useAdmin";
import LoadingSpinner from "../component/LoadingSpinner";
import useU from "../assets/hook/useU";
import { VscFeedback } from "react-icons/vsc";


const Dashboard = () => {


  let [isAdmin,adminLoading]= useAdmin()

  let [ULoading] =useU()


  const {  signOuts } = useContext(Context);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  let nav= useNavigate()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    signOuts();

    nav("/login")
    
  };

  // Theme State
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  
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

  if(adminLoading){
    return <LoadingSpinner></LoadingSpinner>
  }


  

  return (
   
    <div className="flex min-h-screen bg-gray-100 josefin-sans-font">
      
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative w-64 bg-gray-900 text-white p-5 space-y-4 flex flex-col transition-transform duration-300 ease-in-out z-50`}
      >
        {
          isAdmin ?(
            <h2 className="text-3xl font-semibold text-center text-yellow-400">Admin Panel</h2>
          ) : (
            <h2 className="text-3xl font-semibold text-center text-yellow-400">User Panel</h2>
          )
        }
        <hr />
        
        
        <nav className="flex flex-col space-y-3 text-lg">
          
        

          <Link to="/dashboard" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
            <FaHome className="text-yellow-400" />
            <span>Dashboard Home</span>
          </Link>
          <Link to="/dashboard/addrevenue" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
                <FaMoneyBillWave className="text-green-400" />
                <span>Add Revenue</span>
              </Link>
              <div className="flex justify-end mb-6 fixed top-5  left-0 md:left-70 z-50">
              <button
                onClick={toggleTheme}
                className="p-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 rounded-full shadow-lg transition duration-300"
              >
                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            </div>

          {/* Conditional Links for Admin and User */}
          {isAdmin ? (
            <>
              
              <Link to="/dashboard/managerevenue" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
                <FaChartLine className="text-blue-400" />
                <span>Manage Revenue</span>
              </Link>
              <Link to="/dashboard/manageuser" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
                <FaUsers className="text-red-400" />
                <span>Manage Users</span>
              </Link>
              <Link to="/dashboard/alltransection" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
                <RiMoneyDollarCircleFill className="text-red-400" />
                <span>All Transactions</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard/adtransection" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
                <RiMoneyDollarCircleFill className="text-red-400" />
                <span>Add Transaction</span>
              </Link>
              <Link to="/dashboard/mytransection" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
              <FaHandsHelping  className="text-red-400"/> 
                <span>My Transactions</span>
              </Link>
              <Link to="/dashboard/myrevenue" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
                <FaChartLine className="text-blue-400" />
                <span>My Revenue</span>
              </Link>
              <Link to="/dashboard/sendfeedback" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
              <VscFeedback className="text-blue-400"/> 
                <span>Send Feedback</span>
              </Link>
            </>
          )}

          {/* Common Links */}
          <Link to="/dashboard/myprofile" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
            <FaUser className="text-purple-400" />
            <span>My Profile</span>
          </Link>
          <Link to="/" onClick={closeSidebar} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
            <AiFillHome className="text-purple-400" />
            <span>Home</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 transition">
            <RiLogoutBoxFill className="text-purple-400" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
      

      {/* Main Content */}
      <div className={`flex-1 p-5 ${darkMode ? 'bg-[#275a7d]' : 'bg-[#D1D5DB]'}  `}>
        {/* Mobile Menu Button */}
        <button onClick={toggleSidebar} className="md:hidden mb-4 p-2 bg-gray-900 text-white rounded-md">
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
        

        <h1 className={`text-4xl font-bold  font-stretch-extra-condensed  text-center ${darkMode ? 'text-white' : 'text-black'}  md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-500 to-purple-600  bg-clip-text drop-shadow-lg`}>
           DASHBOARD
          </h1>
          
          

        <div className="mt-4  w-full p-5 rounded-lg">
          <Outlet />
        </div>
        
      </div>
      
    </div>
  );
};

export default Dashboard;
