import axios from 'axios';
import React, { useContext } from 'react'

import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Context } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { FaExclamationTriangle } from 'react-icons/fa';



const Alltransection = () => {

   let {user}=useContext(Context)

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:3000/alltransection");
    return response?.data;
  };


  const { data: mytransection = [], refetch } = useQuery({
    queryKey: [user?.email,"revenue"], 
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
          .then(response => {
          
            refetch()
            Swal.fire(
              'Deleted!',
              'The item has been deleted.',
              'success'
            );
           
          })
          .catch(error => {
            // Handle error
            Swal.fire(
              'Error!',
              'There was an issue deleting the item.',
              'error'
            );
          });
      }
    });
  };

  if(mytransection.length==0){
  
      return <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <FaExclamationTriangle className="text-yellow-500 text-5xl mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">Oops! No transactions found here.</h2>
        <p className="text-gray-500 mt-2">It seems there are no transactions available at the moment.</p>
      </div>
    </div>
    }


  return (
    <div>

<div className="overflow-x-auto mt-10 p-4">
      <table className="w-full border-collapse bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200 text-black">
          <tr>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {mytransection.map((txn) => (
            <tr key={txn._id} className="border-b hover:bg-gray-100 text-black">
              <td className="p-3">${txn.amount}</td>
              <td className="p-3">{txn.type}</td>
              <td className="p-3">{txn.email}</td>
              <td className="p-3">{new Date(txn.date).toLocaleDateString()}</td>
              <td className="p-3">
               <h1>{txn.status}</h1>
              </td>

              <td>
              <button
                    className="bg-red-500 text-black px-3 py-1 rounded w-full md:w-auto"
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




    </div>
  )
}

export default Alltransection