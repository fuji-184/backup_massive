import React from 'react';
import FormComponent from '../../../utilities/FormComponent';
import { useNavigate } from "react-router-dom";
import PageTitle from '../../../utilities/PageTitle'

const AddVideo = () => {
  
  const navigate = useNavigate();
  
 
  // Definisikan metode onSubmit yang akan dijalankan saat formulir disubmit
  const handleSubmit = (data) => {
    // Lakukan apa pun dengan data yang diterima
    console.log(data);
    navigate(`/dashboard/video`, { replace: true });
    
  };

  // Definisikan properti yang akan diberikan ke FormComponent
  const method = 'POST'; // Metode permintaan HTTP yang akan digunakan (misalnya 'GET', 'POST', dll.)
  const url = 'http://localhost:3000/video/upload'; // URL endpoint yang akan digunakan untuk mengirim data
  const inputs = [
    // Daftar input yang akan ditampilkan dalam formulir
    { name: 'judul', label: 'Judul', type: 'text' },
    { name: 'deskripsi', label: 'Deskripsi', type: 'text' },
    { name: 'video', label: 'Video', type: 'file' },
  ];

  return (
    <div>
      <PageTitle title="Add Video" />
      <FormComponent method={method} url={url} inputs={inputs} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddVideo;
