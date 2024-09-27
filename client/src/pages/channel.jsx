import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoCard from '@/components/videoCard';

const Channel = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [channel, setChannel] = useState();
    const [isVideos, setIsVideos] = useState(true);

    const fetchVideos = async () => {
        setLoading(true);
        try{
            const res = await fetch(`http://localhost:3000/api/video/uservideos/${id}`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await res.json();
            if(data.error === "No Videos Found"){
                setIsVideos(false);
                return;
            }
            setVideos(data.videos);
            setChannel(data.user);
        }
        catch(error){
            console.log("Error while fetching videos: ", error);
        }
        finally{
            setLoading(false);
        }
    }

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

  return (
    <div className='min-h-screen mt-5'>
        <h1 className='text-xl font-bold text-center mb-10'>
            {channel?.username}
        </h1>
        {videos.length > 0 ? (
        <div className='grid grid-cols-4 gap-6'>
        {videos.map((video) => (
            <VideoCard 
              video={video}
              handleVideoClick={handleVideoClick}
              key={video._id}
            />
        ))}
        </div>
      ) : (
        <p className='text-center mt-10'>No videos found.</p>
      )}
      
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default Channel