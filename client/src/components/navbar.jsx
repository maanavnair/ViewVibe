import React from 'react'
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';

const Navbar = () => {

    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        try{
            const res = await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
            })
            const data = await res.json();
            if(data.error){
                throw new Error('Error while Logging out');
            }
            localStorage.removeItem('user');
            setUser(null);
        }
        catch(error){
            toast.error(error.message);
        }
    }

  return (
    <nav className='flex justify-between px-10 py-2'>
        <p>ViewVibe</p>
        <span className='flex justify-around w-1/5'>
            <button
                className='border-[2px] border-blue-600 rounded px-4'
            >
                Upload
            </button>
            <button 
                onClick={handleLogout}
                className='border-[1px] border-black rounded bg-red-200 px-4'
            >
                Logout
            </button>
        </span>
    </nav>
  )
}

export default Navbar