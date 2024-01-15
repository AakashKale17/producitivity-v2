import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {

    const navigate = useNavigate();
  
    const Click = () => {
		navigate('/', {replace: true});
	}; 

    const [inputs, setInputs] = useState ({
        username:"",
        email:"",
        password:"",
    });
    
    const [err,setError] = useState(null);


    const handleChange = e => {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleSubmit = async e => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/backend/auth/register", inputs).then(res => {
                navigate('/signin');
              })
        }
        catch(err){
            setError(err.response.data);
        }
    };

  return (
    <div className='container'>
    <button onClick={Click}>Back</button>
    <div className="header">
    <h1>Productivity</h1>
    </div>

    <form>
    <div className="inputs">

    <div className='input'>
    <input required type='text' placeholder='Enter Name...' name='username' onChange={handleChange} />
    </div>    
      
    <div className='input'>
    <input required type='email' placeholder='Enter Email...' name='email' onChange={handleChange} />
    </div>
    
    <div className='input'>
    <input required type='password' placeholder='Enter Password...' name='password' onChange={handleChange} />
    </div>
    
    </div>
    
    <div className="submit-container">
    <div className="submit" onClick={handleSubmit}>Register</div> 
    </div>
    </form>

    {err && <p>{err}</p>}
    
    <div className="forgot-pass"><span>Already have an account?<Link to='/signin'>Sign In</Link></span></div>
    </div>
  )
}

export default Register;