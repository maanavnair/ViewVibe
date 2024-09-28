import { UserContext } from '@/context/userContext';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const Sidebar = () => {

    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

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
            //localStorage.removeItem('user');
            setUser(null);
        }
        catch(error){
            toast.error(error.message);
        }
    }

  return (
    <div className='w-[15vw] min-h-screen flex flex-col items-center py-5 bg-gray-800'>
        <span 
            className='hover:bg-gray-900 w-full text-center py-5 cursor-pointer' 
            onClick={() => navigate('/')}
        >
            <h1>Home</h1>
        </span>
        <span 
            className='hover:bg-gray-900 w-full text-center py-5 cursor-pointer'
            onClick={() => navigate(`/myvideos/${user._id}`)}
        >
            <h1>My Videos</h1>
        </span>
        <span 
            className='hover:bg-gray-900 w-full text-center py-5 cursor-pointer' 
            onClick={() => navigate('/upload')}
        >
            <h1>Upload</h1>
        </span>
        <span 
            className='hover:bg-gray-900 w-full text-center py-5 cursor-pointer' 
            onClick={handleLogout}
        >
            <h1>Logout</h1>
        </span>
    </div>
  )
}

export default Sidebar