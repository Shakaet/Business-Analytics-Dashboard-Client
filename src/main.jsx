import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import Dashboard from './layout/Dashboard.jsx';
import DashboardHome from './routes/DashboardHome.jsx';
import AddRevenue from './routes/AddRevenue.jsx';
import ManageRevenue from './routes/ManageRevenue.jsx';
import ManageUser from './routes/ManageUser.jsx';
import UpdateRevenue from './routes/UpdateRevenue.jsx';
import MyProfile from './routes/MyProfile.jsx';
import Addtransection from './routes/addtransection.jsx';
import Mytransection from './routes/Mytransection.jsx';
import Alltransection from './routes/Alltransection.jsx';
import Adminroute from './routes/Adminroute.jsx';
import UserRoute from './routes/UserRoute.jsx';



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
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      {
        path:"/dashboard",
        element:<DashboardHome></DashboardHome>
      },
      {
        path:"/dashboard/addrevenue",
        element:<Adminroute><AddRevenue></AddRevenue></Adminroute>
      },
      {
        path:"/dashboard/managerevenue",
        element:<Adminroute><ManageRevenue></ManageRevenue></Adminroute>
      },
      {
        path:"/dashboard/manageuser",
        element:<Adminroute><ManageUser></ManageUser></Adminroute>
      },
      {
        path:"/dashboard/updaterevenue/:id",
        element:<Adminroute><UpdateRevenue></UpdateRevenue></Adminroute>
      },
      {
        path:"/dashboard/alltransection",
        element:<Adminroute><Alltransection></Alltransection></Adminroute>
      },
      {
        path:"/dashboard/myprofile",
        element:<MyProfile></MyProfile>
      },
      {
        path:"/dashboard/adtransection",
        element:<Addtransection></Addtransection>
      },
      {
        path:"/dashboard/mytransection",
        element:<Mytransection></Mytransection>
      }
    ]
    
  }
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <RouterProvider router={router} />
  </QueryClientProvider>
  </AuthProvider>,
)
