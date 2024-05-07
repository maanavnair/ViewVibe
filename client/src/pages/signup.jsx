import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import signupImage from '../assets/signup-img.png'
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button"


const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [confirm, setConfirm] = useState("");
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password.length < 6){
      toast.error('Password Length must be more than 6');
      return;
    }
    if(password !== confirm){
      toast.error('Confirm Password must be equal to Password');
      return;
    }
    if(name === "" || username === "" || email === "" || password === ""){
      toast.error('Enter all fields');
      return;
    }
    try{
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        credentials: 'include',
        body: JSON.stringify({name, username, email, password})
      })
      const data = await res.json();
      if(data.error){
        throw new Error(data.error);
      }
      await setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    }
    catch(error){
      toast.error(error.message);
    }
  }

  return (
    <div className='flex'>
      <div className='w-1/2 min-h-screen flex items-center justify-center bg-orange-100'>
        <img src={signupImage} />
      </div>
      <form onSubmit={handleSubmit} 
            className='flex py-5 flex-col w-1/2 justify-center items-center'
        >
            <h1 className='text-2xl font-bold text-center font-sans mb-5'>
                ViewVibe
            </h1>
            <span className='flex flex-col'>
              <label htmlFor='name' className='mb-1 text-orange-700'>Name</label>
              <input
                  name='name' 
                  type='text'
                  placeholder='name'
                  className='border-black border-[1px] mb-5 py-2 px-3 w-[30vw] bg-white'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
            </span>
            <span className='flex flex-col'>
              <label htmlFor='username' className='mb-1 text-orange-700'>Username</label>
              <input
                  name='username' 
                  type='text'
                  placeholder='Username'
                  className='border-black border-[1px] mb-5 py-2 px-3 w-[30vw] bg-white'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
            </span>
            <span className='flex flex-col'>
                <label htmlFor='email' className='mb-1 text-orange-700'>Email</label>
                <input
                    name='email' 
                    type='text'
                    placeholder='Email'
                    className='border-black border-[1px] mb-5 py-2 px-3 w-[30vw] bg-white'
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
                    className='border-black border-[1px] mb-5 py-2 px-3 w-[30vw] bg-white'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </span>
            <span className='flex flex-col'>
                <label htmlFor='confirm' className='mb-1 text-orange-700'>Confirm Password</label>
                <input
                    name='confirm' 
                    type='password'
                    placeholder='Confirm Password'
                    className='border-black border-[1px] mb-5 py-2 px-3 w-[30vw] bg-white'
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />
            </span>
            <Button className='w-[30vw]'>
              Signup
            </Button>
            <span className='mt-2'>
                Already have an account?{" "}
                <Link to='/login' className='text-blue-600 hover:underline'>
                    Login
                </Link>
            </span>
        </form>
    </div>
  )
}

export default Signup