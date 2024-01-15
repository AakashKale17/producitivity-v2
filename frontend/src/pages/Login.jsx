import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Login() {

  const navigate = useNavigate();
  
  const Click = () => {
		    navigate('/', {replace: true});
	} 

  const [inputs, setInputs] = useState ({
    email:"",
    password:"",
});

const [err,setError] = useState(null);

const { login } = useContext(AuthContext); 

const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
};

//const instance = axios.create({
//  withCredentials: true
//})

const handleSubmit = async e => {
    e.preventDefault()
    try{
        console.log(inputs);
        await login(inputs).then(res => {
            navigate('/');
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
    <input type='email' placeholder='Enter Email...' name='email' onChange={handleChange} />
    </div>

    <div className='input'>
    <input type='password' placeholder='Enter Password...' name='password'onChange={handleChange} />
    </div>

    </div>
   
    <div className="submit-container">
    <div className="submit"  onClick={handleSubmit}>Login</div>  
    </div>
    </form>
    
    {err && <p>{err}</p>}
    <div className="forgot-pass">Don't have an account?<span><Link to='/register'>Register</Link></span></div>
    </div>
  )
}

export default Login;