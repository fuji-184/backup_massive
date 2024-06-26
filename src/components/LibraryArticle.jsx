import React, { useState, useRef } from 'react';

const LibraryArticle = () => {
  const [judul, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (file) => {
    setIsUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=0cc61493cbf363a64718706827b5ec29', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.data.display_url;

      const imageElement = `<img src="${imageUrl}" alt="Uploaded Image" style="max-width: 100%;">`;
      editorRef.current.focus();
      document.execCommand('insertHTML', false, imageElement);
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    setIsUploading(false);
  };

  const handleSave = () => {
    const articleData = {
      judul,
      content,
    };
    
    console.log(articleData)

    fetch('http://localhost:3000/article/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Article saved:', data);
      })
      .catch(error => {
        console.error('Error saving article:', error);
      });
  };

  const handleFormat = (format) => {
    editorRef.current.focus();
    document.execCommand(format, false, null);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        className="border border-gray-300 p-2 mb-4 w-full"
        placeholder="Title"
        value={judul}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="border border-gray-300 p-2 mb-4 flex">
        <div className="flex items-center">
          <button
            className="bg-gray-200 px-2 py-1 rounded mr-2 hover:bg-gray-400"
            onClick={() => handleFormat('bold')}
          >
            Bold
          </button>
          <button
            className="bg-gray-200 px-2 py-1 rounded mr-2 hover:bg-gray-400"
            onClick={() => handleFormat('italic')}
          >
            Italic
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-400"
            onClick={() => fileInputRef.current.click()}
          >
            Upload Gambar
          </button>
          {isUploading && <div className="animate-spin ml-2">&#9696;</div>}
        </div>
      </div>
      <div
        className="border border-gray-300 p-2"
        contentEditable={true}
        ref={editorRef}
        onInput={(e) => setContent(e.target.innerHTML)}
      ></div>
      <button className="bg-blue-500 text-white py-2 px-4 mt-4" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default LibraryArticle;