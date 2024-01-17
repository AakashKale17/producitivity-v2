import React, { useContext, useEffect, useState } from 'react';
import './Single.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

function Single() {

  const navigate = useNavigate();
  
  const Click = () => {
		    navigate('/', {replace: true});
	} 

  const [post, setPost] = useState([]);

  const location = useLocation()

  const postId  = location.pathname.split("/")[2]

  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/backend/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/backend/posts/${postId}`).then(res => {
        navigate('/');
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <button onClick={Click}>Back</button>
      <h1>Post Information</h1>
      <h2>Name: {post.name}</h2>
      <h2>Contact no: {post.contact}</h2>
      <h2>Date and Time: {post.date}</h2>
      <h2>Description: {post.description}</h2>
      <h3>Post made by {post.username}</h3>
      {currentUser.username === post.username && (<div className="submit"><button >Edit</button><button onClick={handleDelete}>Delete</button></div>)}
    </div>
  )
}

export default Single;

