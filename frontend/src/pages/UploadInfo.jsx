// UploadInfo.jsx
import React, { useState } from 'react';
import './UploadInfo.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UploadInfo() {

  const state = useLocation().state

  const [name, setName] = useState(state?.name || "");
  const [contact, setContact] = useState(state?.contact || "");
  const [date, setDate] = useState(state?.date || "");
  const [description, setDescription] = useState(state?.description || "");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const upload = async () =>{
    try{
      const formData = new FormData();
      formData.append("file", file)
      const res = await axios.post("http://localhost:8800/backend/upload", formData)
      return res.data
        } catch (err) {
          console.log(err)
        }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pdfUrl = await upload();
    try{
        console.log([name, contact, date, description, file])
      state ? await axios.put(`http://localhost:8800/backend/posts/${state.id}`, {
        name, contact, date, description, file: file ? pdfUrl: ""}
       ,{
        withCredentials: true,
//        headers: { 'Content-Type': 'multipart/form-data' }
      }
      ) : await axios.post(`http://localhost:8800/backend/posts/`, {
        name, contact, date, description, file:file ? pdfUrl: ""}
        ,{
        withCredentials: true,
//        headers: { 'Content-Type': 'multipart/form-data' }
        }
        ).then(res => {
          navigate('/');
        });
    }catch(err){
      console.log(err)
    }
  };

  const Click = () => {
    navigate('/', {replace: true});
} 

  return (
    <div className="upload-info-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <button onClick={Click}>Back</button>
        <h2>Upload Information</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={e=>setName(e.target.value)}
        />

        <label htmlFor="contact">Contact No:</label>
        <input
          type="tel"
          id="contact"
          name="contact"
          value={contact}
          onChange={e=>setContact(e.target.value)}
        />

        <label htmlFor="date">Date and Time:</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={date}
          onChange={e=>setDate(e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={e=>setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="file">Upload File:</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={e=>setFile(e.target.files[0])}
          accept=".pdf, .doc, .docx"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UploadInfo;
