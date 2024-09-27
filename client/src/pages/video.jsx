import { UserContext } from '@/context/userContext';
import React, { useState, useEffect, useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Video = () => {
    const { id } = useParams();
    const [video, setVideo] = useState();
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const [disableComment, setDisableComment] = useState(true);
    
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
            setComments(data.comments);
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

    useEffect(() => {
        if(content === ""){
            setDisableComment(true);
        }
        else{
            setDisableComment(false);
        }
    }, [content]);

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

    const handlePostComment = async () => {
        setDisableComment(true);
        try{
            const res = await fetch(`http://localhost:3000/api/comment/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user._id,
                    username: user.username,
                    content: content
                }),
                credentials: 'include',
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
        catch(error){
            console.error("Error posting comment: ", error);
        }
        finally{
            setDisableComment(false);
        }
    }

    const handleCommentDelete = async (commentId) => {
        try{
            const res = await fetch(`http://localhost:3000/api/comment/${commentId}`, {
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
        catch(error){
            console.error("Error deleting comment: ", error);
        }
    }

    console.log(comments);

    return (
        <div className="container mx-auto my-8 px-4 flex flex-col">
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : video ? (
                <div>
                    <div className="flex w-full mb-8">
                        <div className="flex-shrink-0 w-3/5">
                            <video
                                controls
                                autoPlay
                                className="w-full h-auto rounded-lg shadow-lg"
                                src={video.videoLink}
                            />

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
                        <div className="ml-6 w-2/5">
                            <h1 className="text-xl font-semibold mb-2">{video.title}</h1>
                            <p className="text-gray-600 mb-1">Uploaded by {video.username}</p>
                            <p className="text-gray-700">{video.desc}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">Comments</h2>
                        <span>
                            <input 
                                type='text'
                                placeholder='Enter your thoughts...'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className='border-gray-900 border-b-2 p-2 focus:outline-none w-3/5'
                            />
                            <button 
                                className='ml-2 cursor-pointer'
                                onClick={() => handlePostComment()}
                                disabled={disableComment}
                            >
                                <IoSend className='w-6 h-6' />
                            </button>
                        </span>
                        {comments.length > 0 ? (
                            <ul className="space-y-4 mt-5">
                                {comments.map((comment) => (
                                    <li 
                                        key={comment._id} 
                                        className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between"
                                    >
                                        <span>
                                            <p className="font-medium text-gray-700">{comment.username}</p>
                                            <p className="text-gray-600">{comment.content}</p>
                                        </span>
                                        {
                                            user._id === comment.userId &&
                                            <button 
                                                className='bg-red-600 p-2 rounded-md'
                                                onClick={() => handleCommentDelete(comment._id)}
                                            >
                                                <MdDelete className='w-6 h-6 text-white' />
                                            </button>
                                        }
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-center mt-5">
                                No comments yet. Be the first to comment!
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-center">Video not found.</p>
            )}
        </div>
    );
};

export default Video;
