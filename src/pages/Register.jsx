import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import SocialLogin from '../shared/SocialLogin';
import { Context } from '../provider/AuthProvider';


let image_hosting_key=import.meta.env.VITE_image_Hosting_key

let image_hosting_API =`https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Register = () => {

  let link= useNavigate()
       
       let {createRegistered,updateUserProfile}= useContext(Context)
    const [formData, setFormData] = useState({
        file: null,
      });

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
      };


      let handleSubmit = async (e) => {
        e.preventDefault();
      
        // Get form data
        let name = e.target.name.value;
        let email = e.target.email.value;
        let img = formData.file;
        let password = e.target.password.value;
      
        // Password validation regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      
        
        if (password.length < 8) {
          toast.error('Password must be at least 8 characters long.');
          return; 
        }
      
        if (!/[a-z]/.test(password)) {
          toast.error('Password must contain at least one lowercase letter.');
          return; 
        }
      
        if (!/[A-Z]/.test(password)) {
          toast.error('Password must contain at least one uppercase letter.');
          return; 
        }
      
        if (!/\d/.test(password)) {
          toast.error('Password must contain at least one number.');
          return; 
        }
      
        if (!/[!@#$%^&*]/.test(password)) {
          toast.error('Password must contain at least one special character (!, @, #, $, %, ^, &, *).');
          return; 
        }
      
       
        let imageFiles = { image: formData.file };
      
        // Image upload request
        axios.post(image_hosting_API, imageFiles, {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        })
        .then(res => {
          if (res.data.success) {
            let usersData={
              name:name,
              email:email,
              user_photo:res.data.data.display_url,
              role:"user"

          }

            let profileUpdates={
              displayName: name,
              photoURL: res.data.data.display_url
            }
            createRegistered(email,password)
            .then((res)=>{
              updateUserProfile(res.user,profileUpdates)
              .then((result)=>{
               toast.success("Profile Updated")
              
            axios.post("http://localhost:3000/users",usersData)
            .then((res)=>{
                if(res.data.insertedId){
                    // alert("user added")
                    
                }
            })
            .catch((error)=>{
                // alert("user already existed")
            })
              })
              .catch((error)=>{
                // console.log(error)
      
              })
              e.target.reset();
              link("/")
            })

            

            // toast.success('Image uploaded successfully!');
          }
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          toast.error('There was an error uploading your image. Please try again.');
        });
      };



        

  
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-3xl font-semibold text-center mb-6">Register</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />

      {/* Profile photo upload */}
      <label className="block">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          name='img'
          required
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
        />
      </label>

      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md"
      >
        Register
      </button>
    </form>
    <div className="text-center mt-4">
      <span>Already have an account? </span>
      <Link to={"/login"} className="text-blue-500">Login</Link>
      <SocialLogin></SocialLogin>
    </div>
  </div>
</div>

    );
};

export default Register;