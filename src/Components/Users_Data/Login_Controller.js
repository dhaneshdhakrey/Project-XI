import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Navbar/Nav';
import Login from './Login';
import './Login_Controller.css';
import Signup from './Signup';
import Footer from '../Footer/Footer';
import Dashboard from './MySpace/Dashboard';

function LoginController() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  
  if (isLoggedIn) {
    return <div>
      <Dashboard />
    </div>;
  }

  return (
    <div className='login-controller'>
      <div className='top-container'>
        <h2 className="login-title">
          <span 
            onClick={() => setShowLogin(true)}
            className={`cursor-pointer ${showLogin ? 'font-bold' : ''}`}
          >
            Login
          </span>
          {' or '}
          <span 
            onClick={() => setShowLogin(false)}
            className={`cursor-pointer ${!showLogin ? 'font-bold' : ''}`}
          >
            Register
          </span>
        </h2>
      </div>
      
      {showLogin ? <Login /> : <Signup />}
      
      
    </div>
  );
}

export default LoginController;