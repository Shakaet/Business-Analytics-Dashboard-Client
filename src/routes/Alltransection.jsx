import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaExclamationTriangle, FaMoon, FaSun } from 'react-icons/fa';
import { Context } from '../provider/AuthProvider';

const Alltransection = () => {
  let { user } = useContext(Context);

  const fetchUsers = async () => {
    const response = await axios.get("https://business-dashboard-server.vercel.app/alltransection");
    return response?.data;
  };

  const { data: mytransection = [], refetch } = useQuery({
    queryKey: [user?.email, "revenue"],
    queryFn: fetchUsers,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://business-dashboard-server.vercel.app/tansection/${id}`)
          .then(() => {
            refetch();
            Swal.fire('Deleted!', 'The item has been deleted.', 'success');
          })
          .catch(() => {
            Swal.fire('Error!', 'There was an issue deleting the item.', 'error');
          });
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

  if (mytransection.length === 0) {
    return (
      <div className={`flex justify-center items-center h-screen  ${darkMode ? ' text-white bg-black' : 'bg-gray-100 text-black'}`}>
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <FaExclamationTriangle className="text-yellow-500 text-5xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Oops! No transactions found here.</h2>
          <p className="text-gray-500 mt-2">It seems there are no transactions available at the moment.</p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="mt-10 p-4">
      {/* Large Screens: Table View */}
      <h2 className={`text-2xl ${darkMode ? ' text-gray-900' : 'text-blue-600'} font-semibold mb-4`}>All Transaction: {mytransection?.length}</h2>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse  shadow-md rounded-lg">
          <thead className={` ${darkMode ? ' text-white bg-black' : 'bg-gray-200 text-black'}`}>
            <tr>
              <th className="p-3 text-left border-2 border-r-2">Amount</th>
              <th className="p-3 text-left border-2 border-r-2">Type</th>
              <th className="p-3 text-left border-2 border-r-2">Email</th>
              <th className="p-3 text- border-2 border-r-2">Date</th>
              <th className="p-3 text-left border-2 border-r-2">Status</th>
              <th className="p-3 text-left border-2 border-r-2">Action</th>
            </tr>
          </thead>
          <tbody className={` ${darkMode ? ' text-white bg-black' : 'text-black'}`}>
            {mytransection.map((txn) => (
              <tr key={txn._id} className={`border-b  ${darkMode ? ' border-white' : 'border-black'}`}>
                <td className="p-3 border-2 border-r-2">${txn.amount}</td>
                <td className="p-3 border-2 border-r-2">{txn.type}</td>
                <td className="p-3 border-2 border-r-2">{txn.email}</td>
                <td className="p-3 border-2 border-r-2">{new Date(txn.date).toLocaleDateString()}</td>
                <td className="p-3 border-2 border-r-2">{txn.status}</td>
                <td className="p-3 border-2 border-r-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded w-full md:w-auto"
                    onClick={() => handleDelete(txn._id)}
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

      {/* Small Screens: Card View */}
      <div className="md:hidden space-y-4">
        {mytransection.map((txn) => (
          <div key={txn._id} className={`${darkMode ? ' bg-black text-white' : ' bg-amber-400 text-black'}  shadow-md rounded-lg p-4 border`}>
            <p className="text-lg font-semibold mb-2">Amount: <span className="text-blue-600">${txn.amount}</span></p>
            <p className=''>Type: <span className="font-medium">{txn.type}</span></p>
            <p className=''>Email: <span className="text-blue-700">{txn.email}</span></p>
            <p className=''>Date: <span className="text-gray-600">{new Date(txn.date).toLocaleDateString()}</span></p>
            <p className=''>Status: <span className="font-semibold">{txn.status}</span></p>
            <button
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded w-full"
              onClick={() => handleDelete(txn._id)}
            >
              Delete
            </button>
          </div>
        ))}

       
      </div>
    </div>
  );
};

export default Alltransection;
