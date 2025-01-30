import React from 'react'
import { useNavigate } from 'react-router-dom';
import Login from './Login';
function LoginController() {
  const navigate = useNavigate();
  let isLoggedIn=localStorage.getItem("isLoggedIn");
  // console.log(isLoggedIn)
  if(isLoggedIn){
     return<div>You are logged in </div>;
  }

  

  return (
    <div>
       <h2 className="login-title">
          <span 
          // onClick={()=> navigate('/login')}
           ><Login/></span>  
          <span>or</span>
          <span 
          // onClick={()=> navigate('/signup')}
          >Register</span>
        </h2>  
    </div>
  )
}

export default LoginController;
