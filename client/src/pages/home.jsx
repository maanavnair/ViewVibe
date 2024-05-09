import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'

const Home = () => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('http://localhost:3000/api/video', {
        method: 'GET',
        credentials: 'include'
      });

      const data = await res.json();
      setVideos(data.videos);
      console.log(data);
      console.log(videos)
    }

    fetchVideos();
  }, []);

  return (
    <div className='px-5'>
      {
        videos.map((video) => (
          <div key={video.id}>
            <img src={video.thumbnailLink} />
            <h1>{video.title}</h1>
            <p>Views: {video.views}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Home