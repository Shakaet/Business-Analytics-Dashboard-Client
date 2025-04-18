import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaMoon, FaSun } from 'react-icons/fa';

// Fetch users from the API
const fetchUsers = async () => {
  const response = await axios.get("https://business-dashboard-server.vercel.app/users");
  return response?.data;
};

const ManageUser = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Handle role change (PATCH)
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(`https://business-dashboard-server.vercel.app/users/${userId}`, { role: newRole });

      toast.success('User role updated successfully!');
      refetch();
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error('Error updating user role. Please try again.');
    }
  };

  // Handle user deletion
  const handleDelete = async (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://business-dashboard-server.vercel.app/users/${userId}`);
          refetch();
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire('Error!', 'There was an issue deleting the user.', 'error');
        }
      }
    });
  };

  
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
    
      
      useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [darkMode]);

  return (
    <div className="p-4  rounded-lg">
       <h2 className={`text-2xl  ${darkMode ? ' text-gray-900' : 'text-blue-600 '} font-bold mb-4`}>Total User: {users.length}</h2>
      {/* Table for larger screens */}
      <div className="overflow-x-auto hidden lg:flex">
        <table className="table w-full ">
          {/* Head */}
          <thead className='border-2 border-white'>
            <tr className={`  ${darkMode ? 'border-2 border-white text-white bg-black' : 'bg-gray-200 text-black border-2 border-black'} `}>
              <th className={` ${darkMode ? 'border-2 border-white' : 'border-2 border-black'}`}>Name</th>
              <th className={` ${darkMode ? 'border-2 border-white' : 'border-2 border-black'}`}>Role</th>
              <th>Action</th>
            </tr>
          </thead>
   

          {/* Body */}
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className={`   ${darkMode ? ' text-white bg-black border-2 border-white' : 'bg-gray-200 text-black border-2 border-black'}`}>
                <td className={`   ${darkMode ? ' border-2 border-white' : 'border-2 border-black'}`}>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.user_photo} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td className={` ${darkMode ? ' border-2 border-white text-black' : 'border-2 border-black text-black'} `}>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="select select-bordered"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-ghost bg-red-500 border-2 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
                   {/* Theme Toggle Button */}
     <div className="flex justify-end mb-6 fixed bottom-2 right-6 z-50">
          <button
            onClick={toggleTheme}
            className="p-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 rounded-full shadow-lg transition duration-300"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

      {/* Responsive Card format for mobile devices */}
      <div className="lg:hidden grid grid-cols-1 gap-4">
        {users.map((user) => (
          <div key={user._id} className={`  ${darkMode ? 'bg-black text-white' : 'bg-amber-400 text-black'} shadow-md p-4 rounded-lg`}>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img src={user.user_photo} alt="Avatar" />
                </div>
              </div>
              <div>
                <h3 className={`font-bold text-lg  ${darkMode ? 'text-white' : 'text-black'} `}>{user.name}</h3>
                <p className={`text-sm opacity-50 font-bold  ${darkMode ? 'text-white' : 'text-black'}`}>{user.email}</p>
              </div>
            </div>

            <div className="mt-3">
              <label className={`block text-sm font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Role</label>
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                className=" text-black font-bold  select select-bordered w-full mt-1"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="mt-4">
              <button
                onClick={() => handleDelete(user._id)}
                className="btn btn-ghost bg-red-500 border-2 font-bold  text-black w-full"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUser;
