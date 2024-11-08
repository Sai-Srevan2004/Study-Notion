import React from 'react'
import './AppLayout.css'
import { Outlet } from 'react-router-dom'
import Nav from '../Components/Common/Nav'

const AppLayout = () => {
  return (
    <div className='App-layout'>
       <Nav></Nav>
      <Outlet></Outlet>
    </div>
  )
}

export default AppLayout
