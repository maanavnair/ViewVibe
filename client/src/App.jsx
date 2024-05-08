import React, { useContext } from 'react'
import './index.css'
import Login from './pages/login'
import Signup from './pages/signup'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/userContext'
import Home from './pages/home'
import Navbar from './components/navbar'
import Upload from './pages/upload'

const App = () => {

  const {user} = useContext(UserContext);

  return (
    <>
      {user ? <Navbar /> : ""}
      <Routes>
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login /> } />
        <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup />} />
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/upload' element={user ? <Upload /> : <Navigate to='/login' />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App