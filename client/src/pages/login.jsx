import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

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
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email:</label>
            <input
                name='email' 
                type='text'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='password'>Password:</label>
            <input
                name='password'
                type='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button>Login</button>
        </form>
    </div>
  )
}

export default Login