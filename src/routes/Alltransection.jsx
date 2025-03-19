import axios from 'axios';
import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Context } from '../provider/AuthProvider';

const Alltransection = () => {
  let { user } = useContext(Context);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:3000/alltransection");
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
        axios.delete(`http://localhost:3000/tansection/${id}`)
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
      {/* Large Screens: Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse  shadow-md rounded-lg">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="p-3 text-left border-2 border-r-2">Amount</th>
              <th className="p-3 text-left border-2 border-r-2">Type</th>
              <th className="p-3 text-left border-2 border-r-2">Email</th>
              <th className="p-3 text- border-2 border-r-2">Date</th>
              <th className="p-3 text-left border-2 border-r-2">Status</th>
              <th className="p-3 text-left border-2 border-r-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {mytransection.map((txn) => (
              <tr key={txn._id} className="border-b  text-black">
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

      {/* Small Screens: Card View */}
      <div className="md:hidden space-y-4">
        {mytransection.map((txn) => (
          <div key={txn._id} className="bg-white shadow-md rounded-lg p-4 border">
            <p className="text-lg font-semibold">Amount: <span className="text-blue-600">${txn.amount}</span></p>
            <p>Type: <span className="font-medium">{txn.type}</span></p>
            <p>Email: <span className="text-gray-700">{txn.email}</span></p>
            <p>Date: <span className="text-gray-600">{new Date(txn.date).toLocaleDateString()}</span></p>
            <p>Status: <span className="font-semibold">{txn.status}</span></p>
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
