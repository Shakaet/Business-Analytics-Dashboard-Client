import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaExclamationTriangle, FaMoon, FaSun } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Mytransection = () => {
  let { user } = useContext(Context);

  const fetchUsers = async () => {
    const response = await axios.get(`https://business-dashboard-server.vercel.app/transection/${user?.email}`);
    return response?.data;
  };

  const { data: mytransection = [], refetch } = useQuery({
    queryKey: [user?.email, "revenue"],
    queryFn: fetchUsers,
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`https://business-dashboard-server.vercel.app/transactions/${id}`, { status: newStatus });
      refetch();
      toast.success('Status updated successfully!');
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error('Failed to update status!');
    }
  };

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
          .then(response => {
            refetch();
            Swal.fire('Deleted!', 'The item has been deleted.', 'success');
          })
          .catch(error => {
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
      <div className="flex justify-center items-center h-screen">
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
      {/* Table for Large Screens */}
      <h2 className={`text-2xl font-bold ${darkMode ? ' text-gray-900' : 'text-blue-600'} mb-4`}>My Transaction: {mytransection?.length}</h2>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse  shadow-md rounded-lg">
          <thead className={` ${darkMode ? 'bg-black text-white border-2 border-white' : 'text-black bg-gray-200 border-2 border-black'} `}>
            <tr>
              <th className="p-3 text-left border-2 ">Amount</th>
              <th className="p-3 text-left border-2 ">Type</th>
              <th className="p-3 text-left border-2 ">Email</th>
              <th className="p-3 text-left border-2 ">Date</th>
              <th className="p-3 text-left border-2 ">Status</th>
              <th className="p-3 text-left border-2">Action</th>
            </tr>
          </thead>
          <tbody className={` ${darkMode ? ' text-white bg-black' : 'text-black bg-gray-300'}`}>
            {mytransection.map((txn) => (
              <tr key={txn._id} className={`border-b    ${darkMode ? 'border-2 border-white hover:bg-gray-900' : 'border-2 border-black hover:bg-gray-100'} `} >
                <td className="p-3 border-2 ">${txn.amount}</td>
                <td className="p-3 border-2 ">{txn.type}</td>
                <td className="p-3 border-2 ">{txn.email}</td>
                <td className="p-3 border-2 ">{new Date(txn.date).toLocaleDateString()}</td>
                <td className="p-3 border-2 ">
                  {txn.status === "pending" ? (
                    <select
                      value={txn.status}
                      onChange={(e) => handleStatusChange(txn._id, e.target.value)}
                      className={`border p-2 rounded ${darkMode ? 'bg-black' : 'bg-yellow-100'}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    <span className="text-green-600 font-semibold">Completed</span>
                  )}
                </td>
                <td className='border-2  p-5'>
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

      {/* Card Format for Small Screens */}
      <div className="md:hidden space-y-4">
        {mytransection.map((txn) => (
          <div key={txn._id} className={` ${darkMode ? ' bg-black text-white' : ' bg-amber-400 text-black'}  p-4 rounded-lg shadow-md`}>
            <p className="text-lg font-semibold">Amount: ${txn.amount}</p>
            <p>Type: {txn.type}</p>
            <p>Email: {txn.email}</p>
            <p>Date: {new Date(txn.date).toLocaleDateString()}</p>
            <p>
              Status: {txn.status === "pending" ? (
                <select
                  value={txn.status}
                  onChange={(e) => handleStatusChange(txn._id, e.target.value)}
                  className="border p-2 rounded bg-yellow-100"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              ) : (
                <span className={`${darkMode ? 'text-green-600' : 'text-black'} font-semibold`}>Completed</span>
              )}
            </p>
            <button
              className="bg-red-500 text-white px-3 py-1 mt-2 rounded w-full"
              onClick={() => handleDelete(txn._id)}
            >
              Delete
            </button>
          </div>
        ))}

     
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
    </div>
  );
};

export default Mytransection;