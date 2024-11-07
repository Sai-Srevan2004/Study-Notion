import React from 'react'
import './AppLayout.css'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className='App-layout'>
      <Outlet></Outlet>
    </div>
  )
}

export default AppLayout
