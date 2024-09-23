import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'

const Home = () => {

  const [videos, setVideos] = useState([]);
  const [isVideos, setIsVideos] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('http://localhost:3000/api/video', {
        method: 'GET',
        credentials: 'include'
      });

      const data = await res.json();
      setVideos(data.videos);
      console.log("Data: ",data);
      console.log("Videos: ", videos)
      if(data.error === "No Videos Found"){
        setIsVideos(false);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className='px-5'>
      {isVideos &&
        videos.map((video) => (
          <div key={video.id}>
            <img src={video.thumbnailLink} className='rounded-md' />
            <h1>{video.title}</h1>
            <p>Views: {video.views}</p>
            <p>{video.username}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Home