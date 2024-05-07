import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { MdFileUpload } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Upload = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
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

        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('video', selectedFile);

        setLoading(true);

        try{
            const res = await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
    
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            else{
                toast.success('Video Uploaded!');
                navigate('/');
            }
        }
        catch(error){
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div className='py-5'>
        <h1 className='text-2xl text-center font-bold mb-10'>
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
                    className='w-[80vw] border-[1px] border-black rounded-none px-2 py-2 mb-5 bg-white'
                />
            </span>
            <span className='flex flex-col'>
                <label htmlFor='video-desc' className='mb-1'>Video Description</label>
                <textarea 
                    name='video-desc'
                    placeholder='Video Description...'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className='w-[80vw] border-[1px] border-black rounded-none px-2 py-2 mb-5 h-[20vh] bg-white'
                />
            </span>
            <span className='flex flex-col'>
                <label htmlFor='video' className='mb-1'>Upload Video</label>
                <input
                name='video'
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className='w-[80vw] border-[1px] border-black rounded-none px-2 py-2 mb-5 bg-white'
                />
            </span>
            {!loading && 
            <button className='bg-black text-white px-8 py-2 w-[80vw] flex justify-center'>
                <span className='flex items-center text-xl'>
                    Upload
                    <MdFileUpload className='ml-1' />
                </span>
            </button>
            }
            {loading && 
                <button>
                    <span className="loading loading-spinner loading-lg"></span>
                </button>
            }
        </form>
    </div>
  )
}

export default Upload