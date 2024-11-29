import React from 'react'
import './App.css'
import AppLayout from './AppLayout/AppLayout'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import HomePage from './Pages/HomePage'

const router=createBrowserRouter([{path:'/',element:<AppLayout/>,children:[
      {path:'/',element:<HomePage/>}
]}])

const App = () => {
  return < RouterProvider router={router}/>
}

export default App
