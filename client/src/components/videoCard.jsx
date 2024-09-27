import React from 'react'

const VideoCard = ({ video, handleVideoClick }) => {
  return (
    <div className="w-full max-w-sm mx-auto cursor-pointer" onClick={() => handleVideoClick(video._id)}>
  <div className="relative">
    <img 
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
        className="text-lg font-semibold"
        onClick={() => handleVideoClick(video._id)}
      >
        {video.title}
      </h1>
      <p className="text-sm text-gray-500">
        {video.username} • {video.views} views
      </p>
    </div>
  </div>
</div>
  )
}

export default VideoCard