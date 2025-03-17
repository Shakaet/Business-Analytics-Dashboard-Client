import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../provider/AuthProvider";


const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(Context); // Access context values
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!name.trim() || !photoURL.trim()) {
      setError("Both fields are required!");
      return;
    }

    try {
      // Update the user's profile
      await updateUserProfile(user, { displayName: name, photoURL });

      setSuccess("Profile updated successfully!");
      setError("");
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to Dashboard after successful update
      }, 2000);
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          Update Your Profile
        </h1>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}
          {/* Name Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {/* Photo URL Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="Enter your photo URL"
              className="input input-bordered w-full"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              required
            />
          </div>
          {/* Update Button */}
          <button type="submit" className="btn btn-primary w-full">
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;