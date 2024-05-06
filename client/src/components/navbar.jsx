import React from 'react'
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

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

    const handleUpload = () => {
        navigate('/upload');
    }

  return (
    <nav className='flex justify-between px-2 py-2'>
        <p className='ml-2'>ViewVibe</p>
        <span className='relative'>
            <FaSearch className='absolute left-8 top-2' />
            <input 
                placeholder='Search...'
                type='text'
                className='py-1 px-10 w-[30vw] border-black border-[1px] rounded-full mx-5'
            />
        </span>
        <span className='flex justify-around w-1/5'>
            <button
                onClick={handleUpload}
                className='group border-[2px] border-blue-600 rounded-none px-4 flex justify-between items-center
                hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out'
            >
                Upload
                <FiPlus className='ml-1 text-blue-600 group-hover:text-white transition duration-300 ease-in-out'/>
            </button>
            <button 
                onClick={handleLogout}
                className='rounded-none bg-black text-white px-6'
            >
                Logout
            </button>
        </span>
    </nav>
  )
}

export default Navbar