import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from './layout/MainLayout.jsx';
import Home from './pages/Home.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './provider/AuthProvider.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/profile",
        element:<PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      }
    ]
    
    
  },
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ToastContainer />
    <RouterProvider router={router} />
  </AuthProvider>,
)
