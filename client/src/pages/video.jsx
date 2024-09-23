import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Video = () => {

    const { id } = useParams();
    const [video, setVideo] = useState();
    const [loading, setLoading] = useState(false);

    const fetchVideo = async () => {
        setLoading(true);
        try{
            const res = await fetch(`http://localhost:3000/api/video/${id}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            setVideo(data.video);
        }
        catch(error){
            console.error("Error fetching video details: ", error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchVideo();
    }, [])

  return (
    <div>
        {video && 
            <div>
                <span>
                    <video
                        controls autoPlay
                        src={video.videoLink}
                    />
                </span>
                <h1 className='text-xl'>
                    {video.title}
                </h1>
                <p>{video.username}</p>
                <p>{video.views} views</p>
                <span>
                    <p>
                        {video.desc}
                    </p>
                </span>
            </div>
        }
    </div>
  )
}

export default Video