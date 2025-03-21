import axios from 'axios';
import React, { useContext } from 'react';
import { Context } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaExclamationTriangle } from 'react-icons/fa';
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

  if (mytransection.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
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
      <h2 className="text-2xl font-bold mb-4">My Transaction</h2>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse  shadow-md rounded-lg">
          <thead className="bg-gray-200 text-black border-2 border-black">
            <tr>
              <th className="p-3 text-left border-2 border-black">Amount</th>
              <th className="p-3 text-left border-2 border-black">Type</th>
              <th className="p-3 text-left border-2 border-black">Email</th>
              <th className="p-3 text-left border-2 border-black">Date</th>
              <th className="p-3 text-left border-2 border-black">Status</th>
              <th className="p-3 text-left border-2 border-black">Action</th>
            </tr>
          </thead>
          <tbody className='text-black'>
            {mytransection.map((txn) => (
              <tr key={txn._id} className="border-b hover:bg-gray-100 border-2 border-black">
                <td className="p-3 border-2 border-black">${txn.amount}</td>
                <td className="p-3 border-2 border-black">{txn.type}</td>
                <td className="p-3 border-2 border-black">{txn.email}</td>
                <td className="p-3 border-2 border-black">{new Date(txn.date).toLocaleDateString()}</td>
                <td className="p-3 border-2 border-black">
                  {txn.status === "pending" ? (
                    <select
                      value={txn.status}
                      onChange={(e) => handleStatusChange(txn._id, e.target.value)}
                      className="border p-2 rounded bg-yellow-100"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    <span className="text-green-600 font-semibold">Completed</span>
                  )}
                </td>
                <td className='border-2 border-black p-5'>
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
          <div key={txn._id} className="bg-white p-4 rounded-lg shadow-md">
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
                <span className="text-green-600 font-semibold">Completed</span>
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
    </div>
  );
};

export default Mytransection;