import React, { useEffect, useState } from 'react';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isVideos, setIsVideos] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/video?page=${page}&limit=2`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();
      
      if (!data.videos || data.videos.length === 0 || data.error === "No Videos Found") {
        setIsVideos(false);
        return;
      }

      setVideos((prevVideos) => {
        const videoIds = new Set(prevVideos.map((video) => video._id));
        const newVideos = data.videos.filter((video) => !videoIds.has(video._id));
        return [...prevVideos, ...newVideos];
      });

      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight) {
        if (!loading && isVideos) {
          fetchVideos();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, isVideos]);

  console.log(videos);

  return (
    <div className='px-5'>
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video._id} className='mb-10'>
            <img src={video.thumbnailLink} className='rounded-md h-[44vh] w-[35vw]' />
            <h1>{video.title}</h1>
            <p>Views: {video.views}</p>
            <p>{video.username}</p>
          </div>
        ))
      ) : (
        <p>No videos found.</p>
      )}
      
      {loading && <p>Loading more videos...</p>}
    </div>
  );
};

export default Home;
