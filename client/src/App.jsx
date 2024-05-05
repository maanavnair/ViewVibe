import React, { useContext } from 'react'
import './index.css'
import Login from './pages/login'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import Home from './pages/home'

const App = () => {

  const {user} = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' /> } />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login /> } />
      </Routes>
      <Toaster />
    </>
  )
}

export default App