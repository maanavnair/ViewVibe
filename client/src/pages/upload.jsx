import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { MdFileUpload } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Upload = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!selectedFile){
            toast.error('Please select a video File');
            return;
        }
        if(!title){
            toast.error('Please enter a video title');
            return;
        }
        if(!desc){
            toast.error('Please enter a video description');
            return;
        }
        console.log({title, desc});
        navigate('/');
    }

  return (
    <div className='min-h-screen'>
        <h1 className='text-2xl text-center font-bold mt-5 mb-10'>
            Upload
        </h1>
        <form 
            onSubmit={handleSubmit}
            className='flex flex-col items-center justify-center'>
            <span className='flex flex-col'>
                <label htmlFor='video-name' className='mb-1' >Video Title</label>
                <input 
                    name='video-name'
                    placeholder='Video Title...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-[80vw] border-[1px] border-black rounded-none px-2 py-2 mb-5'
                />
            </span>
            <span className='flex flex-col'>
                <label htmlFor='video-desc' className='mb-1'>Video Description</label>
                <textarea 
                    name='video-desc'
                    placeholder='Video Description...'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className='w-[80vw] border-[1px] border-black rounded-none px-2 py-2 mb-5 h-[20vh]'
                />
            </span>
            <span className='flex flex-col'>
                <label htmlFor='video' className='mb-1'>Upload Video</label>
                <input
                name='video'
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className='w-[80vw] border-[1px] border-black rounded-none px-2 py-2 mb-5'
                />
            </span>
            <button className='bg-black text-white px-8 py-2 w-[80vw] flex justify-center'>
                <span className='flex items-center text-xl'>
                    Upload
                    <MdFileUpload className='ml-1' />
                </span>
            </button>
        </form>
    </div>
  )
}

export default Upload