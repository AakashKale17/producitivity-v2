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
        <h1>Home Page.</h1>
      </div>
    </div>
  );
}

export default Home;
