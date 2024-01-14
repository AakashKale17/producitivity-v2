// UploadInfo.jsx
import React, { useState } from 'react';
import './UploadInfo.css';
import { useNavigate } from 'react-router-dom';

function UploadInfo() {
  const [formData, setFormData] = useState({
    name: '',
    contactNo: '',
    dateTime: '',
    description: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for submitting the form data
    console.log('Form Data Submitted:', formData);
    // You can send the data to your backend or perform any other actions here
  };

  const navigate = useNavigate();
  const Click = () => {
    navigate('/', {replace: true});
  } 
  

  return (
    <div className="upload-info-container">
      <button onClick={Click}>Back</button>
      <h2>Upload Information</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="contactNo">Contact No:</label>
        <input
          type="tel"
          id="contactNo"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleChange}
          required
        />

        <label htmlFor="dateTime">Date and Time:</label>
        <input
          type="datetime-local"
          id="dateTime"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="file">Upload File:</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
          accept=".pdf, .doc, .docx"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UploadInfo;
