import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { MdFileUpload } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { UserContext } from '@/context/userContext';

const Upload = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (type === 'video') {
            setVideoFile(file);
        } else if (type === 'thumbnail') {
            setThumbnailFile(file);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!videoFile){
            toast.error('Please select a video File');
            return;
        }
        if(!thumbnailFile){
            toast.error('Please select a thumbnail for the video');
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
        formData.append('userId', user._id);
        formData.append('thumbnail', thumbnailFile);
        formData.append('video', videoFile);

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
    <div className='py-5 min-h-screen bg-black text-white flex justify-center'>
        <div className='w-full max-w-lg p-5 rounded-lg bg-gray-900 shadow-md'>
            <h1 className='text-3xl font-bold text-center mb-8'>Upload Video</h1>
            <form 
                onSubmit={handleSubmit}
                className='flex flex-col'
                >
                <span className='flex flex-col mb-5'>
                    <label htmlFor='video-name' className='mb-2 text-lg font-semibold' >Video Title</label>
                    <Input 
                        name='video-name'
                        placeholder='Enter video title...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-full px-4 py-2 border-2 border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                    />
                </span>
                <span className='flex flex-col mb-5'>
                    <label htmlFor='video-desc' className='mb-2 text-lg font-semibold'>Video Description</label>
                    <Textarea 
                        name='video-desc'
                        placeholder='Enter video description...'
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className='w-full px-4 py-2 border-2 border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                    />
                </span>
                <span className='flex flex-col mb-5'>
                    <label htmlFor='video' className='mb-2 text-lg font-semibold'>Upload Video</label>
                    <Input
                    name='video'
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, 'video')}
                    className='w-full px-4 py-2 border-2 border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none'
                    />
                </span>
                <span className='flex flex-col mb-5'>
                    <label htmlFor='thumbnail' className='mb-2 text-lg font-semibold'>Upload Thumbnail</label>
                    <Input
                    name='thumbnail'
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'thumbnail')}
                    className='w-full px-4 py-2 border-2 border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none'
                    />
                </span>
                {!loading && 
                <Button className='w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg'>
                    <span className='flex items-center justify-center text-xl'>
                        Upload
                        <MdFileUpload className='ml-2' />
                    </span>
                </Button>
                }
                {loading && 
                    <Button disabled className='w-full py-3 bg-blue-600 text-white font-bold rounded-lg'>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </Button>
                }
            </form>
        </div>
    </div>
  )
}

export default Upload;
