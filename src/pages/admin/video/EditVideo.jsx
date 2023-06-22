import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormComponent from '../../../utilities/FormComponent';
import Button from '../../../utilities/Button';
import PageTitle from '../../../utilities/PageTitle'

const EditVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/video/${id}`, {
          method: 'GET',
        });
        const jsonData = await response.json();
        setVideoData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, [id]);

  const handleFormSubmit = async (formData) => {
    try {
      const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`http://localhost:3000/video/${id}`, requestOptions);
      if (response.ok) {
        console.log('Video updated successfully');
        
        navigate(`/dashboard/video`, { replace: true });
        
      } else {
        console.error('Error updating video:', response.status);
      }
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const inputs = [
    { label: 'Judul', name: 'judul', type: 'text', isi: videoData.judul },
    { label: 'Deskripsi', name: 'deskripsi', type: 'textarea', isi: videoData.deskripsi },
    { label: 'Link', name: 'video', type: 'file' },
  ];

  return (
    <div>
      <PageTitle title="Edit Video" />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <FormComponent
          method="PUT"
          url={`http://localhost:3000/video/${id}`}
          inputs={inputs}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default EditVideo;
