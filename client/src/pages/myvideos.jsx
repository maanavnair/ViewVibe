import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'

const MyVideos = () => {

    const { id } = useParams();
    const [videos, setVideos] = useState([]);
    const [isVideo, setIsVideo] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const fetchVideos = async () => {
        setLoading(true);
        try{
            const res = await fetch(`http://localhost:3000/api/video/uservideos/${id}`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await res.json();
            if(data.error === 'No Videos Found'){
                setIsVideo(false);
                return;
            }
            setVideos(data.videos);
        }
        catch(error){
            console.error("Error while fetching videos: ", error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchVideos();
    }, [])

    const handleVideoClick = async (id) => {
        await fetch(`http://localhost:3000/api/video/views/${id}`, {
          method: 'POST',
          credentials: 'include',
        });
        navigate(`/video/${id}`);
    }

    const handleDeleteVideo = async (id) => {
        const res = await fetch(`http://localhost:3000/api/video/deletevideo/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        
        const data = await res.json();

        if(data.message){
            toast.success(data.message);
            window.location.reload();
        }
        else{
            toast.error(data.error);
        }
    }

  return (
    <div>
        <h1 className='text-xl font-bold'>
            Your Videos
        </h1>
        {!isVideo && 
            <h1>No Videos Uploaded</h1>
        }
        {isVideo &&
            <div>
                {
                    videos.map((video) => (
                        <div key={video._id} className='mb-10'>
                          <img 
                            src={video.thumbnailLink} 
                            className='rounded-md h-[44vh] w-[35vw] cursor-pointer'
                            onClick={() => handleVideoClick(video._id)} 
                          />
                          <h1
                            className='cursor-pointer'
                            onClick={() => handleVideoClick(video._id)}
                          >
                            {video.title}
                          </h1>
                          <p>Views: {video.views}</p>
                          <p>{video.username}</p>
                          <Button variant='destructive' onClick={() => handleDeleteVideo(video._id)}>
                            Delete
                        </Button>
                        </div>
                      ))
                }
            </div>
        }
    </div>
  )
}

export default MyVideos