import { UserContext } from '@/context/userContext';
import React, { useState, useEffect, useContext } from 'react'
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";
import { useParams } from 'react-router-dom'

const Video = () => {

    const { id } = useParams();
    const [video, setVideo] = useState();
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const {user} = useContext(UserContext);

    const fetchVideo = async () => {
        setLoading(true);
        try{
            const res = await fetch(`http://localhost:3000/api/video/${id}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            setVideo(data.video);

            if(data.video.likes.includes(user._id)){
                setLiked(true);
            }
            else{
                setLiked(false);
            }
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

    const toggleLike = async () => {
        try{
            const res = await fetch(`http://localhost:3000/api/video/likes/${id}`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({userId: user._id}),
                credentials: 'include'
            });
            const data = await res.json();
            setLiked(data.liked);
            setVideo(data.video);
        }
        catch(error){

        }
    }

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
                {liked ? 
                    <p>
                        <button className='cursor-pointer' onClick={() => toggleLike()}>
                            <FaHeart />
                        </button>
                        {video.likeCount}
                    </p>
                    :
                    <p>
                        <button className='cursor-pointer' onClick={() => toggleLike()}>
                            <CiHeart />
                        </button>
                        {video.likeCount}
                    </p>
                }
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