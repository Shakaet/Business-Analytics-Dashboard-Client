import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';


// Fetch users from the API
const fetchUsers = async () => {
  const response = await axios.get("http://localhost:3000/users");
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
      await axios.patch(`http://localhost:3000/users/${userId}`, { role: newRole });

      
      toast.success('User role updated successfully!')

     
      refetch();
    } catch (error) {
      console.error("Error updating user role:", error);
      
      
      toast.error('Error updating user role. Please try again.')
    }
  };

  
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
          await axios.delete(`http://localhost:3000/users/${userId}`);
          refetch()
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire('Error!', 'There was an issue deleting the user.', 'error');
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Head */}
        <thead>
          <tr className='text-black'>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className='text-black'>
              <td>
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

              <td>
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

       
        <tfoot>
        
        </tfoot>
      </table>
    </div>
  );
};

export default ManageUser;
