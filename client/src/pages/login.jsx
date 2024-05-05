import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../assets/login-img.png';

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
    <div className='flex'>
        <form onSubmit={handleSubmit} 
            className='flex py-5 flex-col w-1/2 justify-center items-center'
        >
            <h1 className='text-2xl font-bold text-center font-sans mb-10'>
                ViewVibe
            </h1>
            <span className='flex flex-col'>
                <label htmlFor='email' className='mb-1 text-orange-700'>Email</label>
                <input
                    name='email' 
                    type='text'
                    placeholder='Email'
                    className='border-black border-[1px] mb-10 py-2 px-3 w-[30vw]'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </span>
            <span className='flex flex-col'>
                <label htmlFor='password' className='mb-1 text-orange-700'>Password</label>
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    className='border-black border-[1px] mb-10 py-2 px-3 w-[30vw]'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </span>
            <button className='border-2 bg-black mt-5 py-2 w-[30vw] text-white'>
                Login
            </button>
            <span className='mt-2'>
                Are you new?{" "}
                <Link to='/signup' className='text-blue-600 hover:underline'>
                    Create an account
                </Link>
            </span>
        </form>
        <div className='w-1/2 min-h-screen bg-orange-100 flex justify-center items-center'>
            <img src={loginImage} />
        </div>
    </div>
  )
}

export default Login