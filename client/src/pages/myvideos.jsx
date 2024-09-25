import { Button } from '@/components/ui/button';
import VideoCard from '@/components/videoCard';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleVideoClick = async (id) => {
        await fetch(`http://localhost:3000/api/video/views/${id}`, {
            method: 'POST',
            credentials: 'include',
        });
        navigate(`/video/${id}`);
    };

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
        <div className='p-5'>
            <h1 className='text-2xl font-bold mb-4'>Your Videos</h1>
            {!isVideo && 
                <h2 className='text-lg'>No Videos Uploaded</h2>
            }
            {isVideo && (
                <div className='flex flex-col space-y-4'>
                    {videos.map((video) => (
                        <div key={video._id} className='flex justify-between items-center border-b border-gray-200 pb-4'>
                            <div className='flex items-center'>
                                <VideoCard 
                                    video={video}
                                    handleVideoClick={handleVideoClick}
                                />
                            </div>
                            <Button 
                                variant='destructive' 
                                onClick={() => handleDeleteVideo(video._id)}
                                disabled={isDeleting}
                            >
                                DELETE
                            </Button>
                        </div>
                    ))}
                </div>
            )}
            {loading && <Loader2 className="animate-spin" />}
        </div>
    );
};

export default MyVideos;
