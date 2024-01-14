import React from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  
  const Click = () => {
		    navigate('/', {replace: true});
	} 

  return (
    <div className='container'>
    <button onClick={Click}>Back</button>
    
    <div className="header">
    <h1>Productivity</h1>
    </div>
  
    <div className="inputs">
      
    <div className='input'>
    <input type='email' placeholder='Enter Email...'/>
    </div>

    <div className='input'>
    <input type='password' placeholder='Enter Password...'/>
    </div>

    </div>
   
    <div className="submit-container">
    <div className="submit" >Login</div>  
    </div>
    
    <div className="forgot-pass">Don't have an account?<span><Link to='/register'>Register</Link></span></div>
    </div>
  )
}

export default Login;