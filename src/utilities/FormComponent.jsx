import React, { useState } from 'react';

const FormComponent = ({ method, url, inputs, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    const requestOptions = {
      method: method, // Menggunakan metode permintaan yang diberikan melalui props
      body: formDataToSend,
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        onSubmit(data); // Mengirimkan respons ke fungsi onSubmit di komponen induk
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white table p-6">
      {inputs.map((input) => (
        <div key={input.name} className="mb-4">
          <label htmlFor={input.name} className="block text-sm font-medium text-gray-700">
            {input.label}
          </label>
          {input.type === 'file' ? (
            <input
              type="file"
              name={input.name}
              id={input.name}
              onChange={handleFileChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          ) : (
            <input
              type="text"
              value={input.isi}
              name={input.name}
              id={input.name}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1"
            />
          )}
        </div>
      ))}
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent rounded-md shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
