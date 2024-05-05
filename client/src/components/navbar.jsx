import React from 'react'
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

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
    <nav className='flex justify-between px-2 py-2'>
        <p className='ml-2'>ViewVibe</p>
        <span>
            <input 
                placeholder='Search'
                type='text'
                className='py-1 px-3 w-[30vw] border-black border-[1px] rounded-full mx-5'
            />
            <button className='rounded-full border-black border-[1px] p-2'>
                <FaSearch />
            </button>
        </span>
        <span className='flex justify-around w-1/5'>
            <button
                className='border-[2px] border-blue-600 rounded px-4 flex justify-between items-center'
            >
                Upload
                <FaPlus className='ml-1 text-blue-300'/>
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