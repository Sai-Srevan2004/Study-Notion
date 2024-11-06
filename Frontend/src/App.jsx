import React from 'react'
import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AppLayout from './AppLayout/AppLayout'
import Home from './Pages/Home/Home'


const App = () => {
  const router=createBrowserRouter([
    {path:"/home",element:<AppLayout/>,children:[
      {path:"/home",element:<Home/>}
    ]}
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
