import { UserContext } from '@/context/userContext';
import React, { useState, useEffect, useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";
import { useParams } from 'react-router-dom';

const Video = () => {
    const { id } = useParams();
    const [video, setVideo] = useState();
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const { user } = useContext(UserContext);

    const fetchVideo = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/api/video/${id}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            setVideo(data.video);
            setLiked(data.video.likes.includes(user._id));
        } catch (error) {
            console.error("Error fetching video details: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideo();     
    }, []);

    const toggleLike = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/video/likes/${id}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ userId: user._id }),
                credentials: 'include'
            });
            const data = await res.json();
            setLiked(data.liked);
            setVideo(data.video);
        } catch (error) {
            console.error("Error liking video: ", error);
        }
    };

    return (
        <div className="container mx-auto my-8 px-4 flex">
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : video ? (
                <div className="flex w-full">
                    <div className="flex-shrink-0 w-full md:w-2/3 lg:w-3/5">
                        <video
                            controls
                            autoPlay
                            className="w-full h-auto rounded-lg shadow-lg"
                            src={video.videoLink}
                        />
                        {/* Views and Likes section */}
                        <div className="flex items-center mt-2">
                            <p className="text-gray-500 mr-4">{video.views} views</p>
                            <button 
                                className={`flex items-center text-lg ${liked ? 'text-red-500' : 'text-gray-500'}`} 
                                onClick={toggleLike}
                            >
                                {liked ? <FaHeart /> : <CiHeart />} 
                                <span className="ml-1">{video.likeCount}</span>
                            </button>
                        </div>
                    </div>
                    <div className="md:ml-4 lg:ml-6 w-full md:w-1/3 lg:w-2/5">
                        <h1 className="text-xl font-semibold mb-2">{video.title}</h1>
                        <p className="text-gray-600 mb-1">Uploaded by {video.username}</p>
                        <p className="text-gray-700">{video.desc}</p>
                    </div>
                </div>
            ) : (
                <p className="text-center">Video not found.</p>
            )}
        </div>
    );
};

export default Video;
