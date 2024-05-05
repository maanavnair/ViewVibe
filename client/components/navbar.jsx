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
    <nav className='flex justify-between'>
        <p>ViewVibe</p>
        <span>
            <button>Upload</button>
            <button onClick={handleLogout}>Logout</button>
        </span>
    </nav>
  )
}

export default Navbar