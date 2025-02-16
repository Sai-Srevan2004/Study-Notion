import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/core/Common/Navbar'

const App = () => {
  return (
    <div className='w-screen min-h-[100vh] bg-black '>
        <Navbar></Navbar>
        <Routes>
           <Route path='/' element={<Home/>}/>
        </Routes>
    </div>
  )
}

export default App
