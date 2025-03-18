import React, { useContext, useState } from 'react';
import { Context } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';

const MyProfile = () => {


    const { user } = useContext(Context);
  



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
        <div className="flex flex-col items-center text-center">
          {/* User Image */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="mt-4">
            <h2 className="text-3xl font-bold text-gray-900">{user?.displayName}</h2>
            <p className="text-lg text-gray-500 mt-1">{user?.email}</p>
          </div>

          {/* Update Profile Button */}
          <div className="mt-6">
            <Link
              to={"/profile"}
              className="bg-indigo-600 text-white text-lg px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
