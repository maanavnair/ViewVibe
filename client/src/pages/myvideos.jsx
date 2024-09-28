import { Button } from '@/components/ui/button';
import VideoCard from '@/components/videoCard';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

const MyVideos = () => {
    const { id } = useParams();
    const [videos, setVideos] = useState([]);
    const [isVideo, setIsVideo] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const navigate = useNavigate();

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/api/video/uservideos/${id}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            if (data.error === 'No Videos Found') {
                setIsVideo(false);
                return;
            }
            setVideos(data.videos);
        } catch (error) {
            console.error("Error while fetching videos: ", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);


    const handleDeleteVideo = async (id) => {
        setIsDeleting(true);
        const res = await fetch(`http://localhost:3000/api/video/deletevideo/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        const data = await res.json();

        if (data.message) {
            toast.success(data.message);
            window.location.reload();
        } else {
            toast.error(data.error);
        }
        setIsDeleting(false);
    };

    return (
        <div className='p-5 min-h-screen w-full'>
            <h1 className='text-2xl font-bold mb-10 text-center'>Your Videos</h1>
            {!isVideo && 
                <h2 className='text-lg text-center'>No Videos Uploaded</h2>
            }
            {isVideo && (
                <div className='grid grid-cols-4 gap-6 px-5'>
                    {videos?.length > 0 && videos.map((video) => (
                        <div key={video._id} className='flex justify-between items-center pb-4 w-full'>
                            <div className='relative flex items-center'>
                                <VideoCard 
                                    video={video}
                                    isVideoOwner= {true}
                                />
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button 
                                            className='absolute p-2 bg-red-600 hover:bg-red-700 rounded-md right-2 top-2'
                                            disabled={isDeleting}
                                        >
                                            <MdDelete />
                                        </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className='bg-black'>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className='text-white'>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription className='text-white'>
                                                This action cannot be undone. This will permanently delete your 
                                                video and remove it's data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel
                                                disabled={isDeleting}
                                            >
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                className='bg-red-600 hover:bg-red-700'
                                                onClick={() => handleDeleteVideo(video._id)}
                                                disabled={isDeleting}
                                            >
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {loading && <Loader2 className="animate-spin" />}
        </div>
    );
};

export default MyVideos;
