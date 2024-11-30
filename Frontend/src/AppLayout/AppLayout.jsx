import React from 'react'
import Navbar from '../Components/Common/Navbar'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div style={{minHeight:'100vh'}} className='bg-richblack-900'>
      <Navbar></Navbar>
       <Outlet></Outlet>
    </div>
  )
}

export default AppLayout
