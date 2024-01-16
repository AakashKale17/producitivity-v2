// Home.jsx
import React, { useContext, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Home() {
  const [showDropdown, setShowDropdown] = useState(false);

  const { currentUser, logout } = useContext(AuthContext);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const posts = [
    {
      id: 1,
      name: "Contractor No.1",
      contact: "0123456789",
      date: "01/14/2024 05:32 PM",
      description: "This is what is the conversation was about."
    },
    {
      id: 2,
      name: "Contractor No.2",
      contact: "9876543210",
      date: "01/02/2024 05:37 PM",
      description: "These are the cliffnotes of what was being dicussed."
    },
  ]

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
                <h2>Contact no: {post.contact}</h2>
                </div>
              <p>{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
