import React from 'react'
import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AppLayout from './AppLayout/AppLayout'
import Home from './Pages/Home/Home'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import OpenRoute from './Components/core/Auth/OpenRoute'

import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import About from "./pages/About/About";

const App = () => {
  const router=createBrowserRouter([
    {path:"/",element:<AppLayout/>,children:[
      {path:"/",element:<Home/>},
      {path:"/signup",element:<OpenRoute>
        <Signup/>
      </OpenRoute>},
      {path:"/login",element:<OpenRoute>
        <Login/>
      </OpenRoute>},
      {path:"/forgot-password",element:<OpenRoute>
        <ForgotPassword/>
      </OpenRoute>},
      {path:"/verify-email",element:<OpenRoute>
        <VerifyEmail/>
      </OpenRoute>},
      {path:"/update-password/:id",element:<OpenRoute>
        <UpdatePassword/>
      </OpenRoute>},
      {path:"/about",element:<OpenRoute>
        <About/>
      </OpenRoute>}
    ]}
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
