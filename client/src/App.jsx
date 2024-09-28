import React, { useContext, useEffect } from 'react'
import './index.css'
import Login from './pages/login'
import Signup from './pages/signup'
import toast, { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/userContext'
import Home from './pages/home'
import Navbar from './components/navbar'
import Upload from './pages/upload'
import Video from './pages/video'
import MyVideos from './pages/myvideos'
import Sidebar from './components/sidebar'
import Channel from './pages/channel'

const App = () => {

  const {user, setUser} = useContext(UserContext);

  const fetchUser = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/auth/user', {
            method: 'GET',
            credentials: 'include',
        });
        console.log('Response:', res);

        if (res.ok) {
            const data = await res.json();
            console.log('Fetched user data:', data);
            if (data.userProfile) {
                setUser(data.userProfile);
            } else {
                console.log('No userProfile in response.');
                setUser(null);
            }
        } else {
            console.log('Response not ok:', res);
            setUser(null);
        }
    } catch (error) {
        console.log('Error fetching user details: ', error);
    }
}



  useEffect(() => {
    if(!user){
      fetchUser();
    }
  }, []);


  return (
    <div className='bg-black text-white min-h-screen'>
      {user ? <Navbar /> : ""}
      <div className='flex'>
      {user ? <Sidebar /> : ""}
        <div className='w-full'>
        <Routes>
          <Route path='/login' element={user ? <Navigate to='/' /> : <Login /> } />
          <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup />} />
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/upload' element={user ? <Upload /> : <Navigate to='/login' />} />
          <Route path='/video/:id' element={user ? <Video /> : <Navigate to='/login' />} />
          <Route path='/myvideos/:id' element={user ? <MyVideos /> : <Navigate to='/login' />} />
          <Route path='/channel/:id' element={user ? <Channel /> : <Navigate to='/login' />} />
        </Routes>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default App