import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../assets/login-img.png';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
            console.log(data);
            //localStorage.setItem('user', JSON.stringify(data));
            navigate('/');
        }
        catch(error){
            toast.error(error.message);
        }
    }

  return (
    <div className='flex'>
        <form onSubmit={handleSubmit} 
            className='flex py-5 flex-col w-[50vw] justify-center items-center'
        >
            <h1 className='text-2xl font-bold text-center font-sans mb-10'>
                ViewVibe
            </h1>
            <span className='flex flex-col'>
                <label htmlFor='email' className='mb-1'>Email</label>
                <Input
                    name='email' 
                    type='text'
                    placeholder='Email'
                    className='w-[30vw] border-2 mb-10 bg-black'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </span>
            <span className='flex flex-col'>
                <label htmlFor='password' className='mb-1'>Password</label>
                <Input
                    name='password'
                    type='password'
                    placeholder='Password'
                    className='w-[30vw] border-2 mb-10 bg-black'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </span>
            <Button className='w-[30vw] bg-blue-500 hover:bg-blue-600'>
                LOGIN
            </Button>
            <span className='mt-2'>
                Are you new?{" "}
                <Link to='/signup' className='text-blue-500 hover:underline'>
                    Create an account
                </Link>
            </span>
        </form>
        <div className='w-[50vw] min-h-screen bg-orange-100 flex justify-center items-center'>
            <img src={loginImage} />
        </div>
    </div>
  )
}

export default Login