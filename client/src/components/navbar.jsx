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
    <nav className='flex items-center w-[100vw] px-2 py-4'>
        <span className='flex items-center'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='outline' className='flex items-center justify-center ml-2'>
                        <RxHamburgerMenu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle className='text-center text-2xl font-bold'>
                            ViewVibe
                        </SheetTitle>
                        <Separator />
                    </SheetHeader>
                    <span className='flex flex-col mt-5'>
                        <Button variant='outline'
                            className='w-full border-none mb-2'
                            onClick = {() => (navigate('/'))}
                        >
                            Home
                        </Button>
                        <Separator className='mb-5' />
                        <h1 className='text-center font-bold mb-1'>
                            User
                        </h1>
                        <Button variant='outline'
                            className='w-full border-none mb-2'
                        >
                            My Videos
                        </Button>
                        <Button variant='outline' 
                            className='w-full border-none mb-2'
                            onClick={handleUpload}
                        >
                            Upload
                        </Button>
                        <Button variant='outline'
                            className='w-full border-none mb-2'
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </span>
                </SheetContent>
            </Sheet>
            <p className='ml-5'>ViewVibe</p>
        </span>
        <span className='relative ml-[20vw]'>
            <FaSearch className='absolute left-8 top-3' />
            <Input 
                placeholder='Search...'
                type='text'
                className='py-1 px-10 w-[30vw] border-2 rounded-full mx-5 '
            />
        </span>
    </nav>
    <Separator className='mb-2 shadow-xl' />
    </>
  )
}

export default Navbar