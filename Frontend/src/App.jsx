import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/core/Common/Navbar'
import OpenRoute from './components/core/core/Auth/OpenRoute'
import Signup from './pages/SignUp'
import Login from './pages/Login'

const App = () => {
  return (
    <div className='w-screen min-h-[100vh] bg-black '>
        <Navbar></Navbar>

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
    </Routes>

    </div>
  )
}

export default App
