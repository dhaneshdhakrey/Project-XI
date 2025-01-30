import React, { useState } from "react";
import "./Signup.css"; // Importing the CSS file
import axios from "axios";
import LoginController from "./Login_Controller";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Footer";


 function Signup () {
  const [username , setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

 async function submitHandler  (event)  {
    event.preventDefault();

    if (!username || !firstName || !lastName || !email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (!isChecked) {
      setErrorMessage("You must agree to the terms and conditions.");
      return;
    }

    setErrorMessage("");

    const credentials = {
     username: username,
     first_name: firstName,
     last_name: lastName,
      email:email,
      password:password,
      re_password:password,
    };


    console.log(credentials);
    let url="http://172.16.112.40:8000/auth/users/"
    let response=await axios.post(url,credentials);
    console.log(response);
        

  };

  return (
    <React.Fragment>
      <Nav/>
    <div className="login-container">
      <div className="login-card">
        {/* <TitleofuserCredentials /> */}
        <form onSubmit={submitHandler}>
          <div className="form-group">
             <label className="form-label" htmlFor="Username">
              UserName
            </label>
            <input
              className="Username"
              type="text"
              id="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
              <div className="form-group">
                <label className="form-label" htmlFor="first-name">
                  First name
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  required
                />
              </div>
          <div className="form-group">
            <label className="form-label" htmlFor="last-name">
              Last name
            </label>
            <input
              className="form-input"
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address *
            </label>
            <input
              className="form-input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password *
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-span">
            <p>
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our Privacy policy.
            </p>
          </div>
          <div className="form-footer">
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <span className="checkbox-label">
                I agree to the terms & conditions
              </span>
            </label>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="form-button">
            REGISTER
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </React.Fragment>
  );
};

export default Signup;
