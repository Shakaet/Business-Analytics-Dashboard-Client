import React, { useContext } from "react";
 
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../provider/AuthProvider";

export const NavBar = () => {
  const { user, signOuts } = useContext(Context); // Get user data and logout function
  let nav=useNavigate()
  const handleLogout = () => {
    signOuts();

    nav("/login")
    
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            
              <>
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </>
          
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Business Dashboard
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          
            <>
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </>
        
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost flex items-center gap-2">
              <img title={user?.displayName} src={user?.photoURL} alt="User Avatar" className="h-8 w-8 rounded-full" />
             
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
