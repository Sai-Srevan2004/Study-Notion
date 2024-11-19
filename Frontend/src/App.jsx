import React from 'react'
import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AppLayout from './AppLayout/AppLayout'
import Home from './Pages/Home/Home'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import OpenRoute from './Components/core/Auth/OpenRoute'

const App = () => {
  const router=createBrowserRouter([
    {path:"/",element:<AppLayout/>,children:[
      {path:"/",element:<Home/>},
      {path:"/signup",element:<OpenRoute>
        <Signup/>
      </OpenRoute>},
      {path:"/login",element:<OpenRoute>
        <Login/>
      </OpenRoute>}
    ]}
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
