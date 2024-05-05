import React, { useContext } from 'react'
import './index.css'
import Login from './pages/login'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/userContext'
import Home from './pages/home'
import Navbar from './components/navbar'

const App = () => {

  const {user} = useContext(UserContext);

  return (
    <>
      {user ? <Navbar /> : ""}
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' /> } />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login /> } />
      </Routes>
      <Toaster />
    </>
  )
}

export default App