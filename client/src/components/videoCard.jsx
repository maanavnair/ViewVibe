import { UserContext } from '@/context/userContext';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video, isVideoOwner = false }) => {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickChannel = async () => {
    if(video.userId === user._id){
      navigate(`/myvideos/${user._id}`);
    }
    else{
      navigate(`/channel/${video.userId}`);
    }
  }

  const handleVideoClick = async (id) => {
    await fetch(`http://localhost:3000/api/video/views/${id}`, {
      method: 'POST',
      credentials: 'include',
    });
    navigate(`/video/${id}`);
  }

  return (
    <div className={`w-full max-w-sm mx-auto ${!isVideoOwner ? 'cursor-pointer' : ''}`}>
  <div className="relative">
    <img 
      onClick={() => handleVideoClick(video._id)}
      src={video.thumbnailLink} 
      alt={video.title} 
      className="w-full h-[180px] object-cover rounded-lg shadow-md hover:brightness-90 transition duration-300 ease-in-out"
    />
  </div>

  <div className="mt-3 flex space-x-3">
    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 font-bold text-lg">
      {video.username.charAt(0).toUpperCase()}
    </div>

    <div className="flex flex-col justify-between">
      <h1 
        className="text-lg font-semibold cursor-pointer"
        onClick={() => handleVideoClick(video._id)}
      >
        {video.title}
      </h1>
      <p className="text-sm text-gray-500">
        <span className='hover:underline' onClick={handleClickChannel}>{video.username}</span> • {video.views} views
      </p>
    </div>
  </div>
</div>
  )
}

export default VideoCard