// Home.jsx
import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

function Home() {
  const [showDropdown, setShowDropdown] = useState(false);

  const { currentUser, logout } = useContext(AuthContext);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/backend/posts");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

 // const posts = [
 //  {
 //     id: 1,
 //     name: "Contractor No.1",
 //     contact: "0123456789",
 //   date: "01/14/2024 05:32 PM",
 //     description: "This is what is the conversation was about."
 //   },
 //   {
 //     id: 2,
 //     name: "Contractor No.2",
 //     contact: "9876543210",
 //     date: "01/02/2024 05:37 PM",
 //     description: "These are the cliffnotes of what was being dicussed."
 //   },
 // ]

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="dropdown" onClick={toggleDropdown}>
          <div className="dropdown-icon">
            <div className="line"></div>
            <div className="line"></div>
          </div>
          {showDropdown && (
            <div className="dropdown-content">
              <div>Profile</div>
              <div>Logout</div>
            </div>
          )}
        </div>
        <div className="logo">Productivity</div>
        <span>{currentUser?.username}</span>
        <div className="submit-container">
          <div className='submit'><Link to='/info'>Post</Link></div>
          <div className="submit">{currentUser ? <Link onClick={logout}>Log Out</Link> : <Link to='/signin'>Sign In</Link>}</div>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
      </nav>
      <div className="content">
        <div className="posts">
          {posts.map((post)=>(
            <div className="post" key={post.id}>
              <div className="post_header">
              <Link to={`/posts/${post.id}`}>
                <h1>{post.name}</h1>
              </Link>
                <h3 className='post_date'>{post.date}</h3>
                </div>
                <div className="post_contact">
                <h2>
                <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                </svg>
                  &nbsp;:&nbsp;{post.contact}
                  </h2>
                </div>
              <p>{post.description}</p>
              <hr width="100%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
