import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const Video = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/video", {
        method: "GET",
      });
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Video Page</h1>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data.map((video, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">{video.judul}</h2>
            <div className="aspect-w-16 aspect-h-9">
              <ReactPlayer url={`http://localhost:3000/${video.link}`} controls={true} width="100%" height="500px" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Video;
