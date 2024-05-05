import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background-img.png';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email === "" || password === ""){
            toast.error('All fields must be filled');
            return;
        }
        try{
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                credentials: 'include',
                body: JSON.stringify({email, password})
            });
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            await setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/');
        }
        catch(error){
            console.log(error)
            toast.error(error.message);
        }
    }

  return (
    <div className='flex items-center justify-center w-full min-h-screen' style={{backgroundImage: `url(${backgroundImage})`}}>
        <form onSubmit={handleSubmit} 
            className='flex py-5 px-16 flex-col w-1/2 backdrop-filter bg-opacity-0 shadow-md backdrop-blur-lg border-0 rouned z-10'
        >
            <label htmlFor='email' className='text-white'>Email:</label>
            <input
                name='email' 
                type='text'
                placeholder='Email'
                className='border-black border-2 rounded mb-10 p-1'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='password' className='text-white'>Password:</label>
            <input
                name='password'
                type='password'
                placeholder='Password'
                className='border-black border-2 rounded mb-10 p-1'
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button className='border-2 border-black bg-red-200 rounded mt-5 py-1'>
                Login
            </button>
        </form>
    </div>
  )
}

export default Login