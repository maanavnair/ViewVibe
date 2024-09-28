import React from 'react'
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';
import { FaSearch } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator"
import { RxHamburgerMenu } from "react-icons/rx";
import { CiMenuBurger } from "react-icons/ci";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"


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
    <>
    <nav className='flex items-center w-[100vw] px-2 py-4 bg-gray-800'>
        <span className='flex items-center'>
            
            <p className='ml-5 text-xl font-semibold cursor-pointer' onClick={() => navigate('/')}>
                ViewVibe
            </p>
        </span>
        <span className='relative ml-[20vw]'>
            <FaSearch className='absolute left-8 top-3 text-white' />
            <Input 
                placeholder='Search...'
                type='text'
                className='py-1 px-10 w-[30vw] border-2 rounded-md mx-5 bg-black'
            />
        </span>
    </nav>
    </>
  )
}

export default Navbar