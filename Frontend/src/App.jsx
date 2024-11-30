import React from 'react'
import './App.css'
import AppLayout from './AppLayout/AppLayout'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import OpenRoute from './Components/Core/Auth/OpenRoute'
import AboutPage from './Pages/AboutPage'

const router=createBrowserRouter([{path:'/',element:<AppLayout/>,children:[
      {path:'/',element:<HomePage/>},
      {path:'/login',element:
        <OpenRoute> <LoginPage/></OpenRoute>
      },
      {path:'/signup',element:
        <OpenRoute><SignupPage/></OpenRoute>
      },
      {path:'/about',element:<AboutPage/>}
]}])

const App = () => {
  return < RouterProvider router={router}/>
}

export default App
