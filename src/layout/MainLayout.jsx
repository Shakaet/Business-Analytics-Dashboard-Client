import React from 'react'
import { NavBar } from '../component/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer'


export const MainLayout = () => {
  return (
    <div className='josefin-sans-font'>

        <NavBar></NavBar>
        <div className='min-h-screen'>
        <Outlet></Outlet>
        </div>
        <Footer></Footer>
        
    </div>
  )
}
