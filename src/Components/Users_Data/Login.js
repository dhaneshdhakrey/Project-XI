import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Importing the CSS file
// import LoginController from "./Login_Controller";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Footer";
const LoginForm = () => {
  async function submitHandler(event) {
    event.preventDefault();
    let credentials = {
      email: prevMail,
      password: prevPassword,
    };
    console.log(credentials);
    try {
      let url = `http://172.16.112.40:8000/auth/jwt/create/`;

      let response = await axios.post(url, credentials);

      console.log(response.data.access);
      localStorage.setItem("isLoggedIn",response.data.access);

    } catch (error) {
      console.log(error.message);
    }
  }
  let [prevMail, setMail] = useState("");
  let [prevPassword, setPassword] = useState("");
  function emailHandler(event) {
    setMail(event.target.value);
  }
  function passwordHandler(event) {
    setPassword(event.target.value);
  }
  return (
    <div>
      <Nav />
      <div className="login-container">
        <div className="login-card">
          {/* <LoginController /> */}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Username or Email Address *
              </label>
              <input
                className="form-input"
                type="text"
                id="email"
                placeholder="Enter your username or email"
                required
                onChange={emailHandler}
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
                placeholder="Enter your password"
                required
                onChange={passwordHandler}
              />
            </div>
            <div className="form-footer">
              <label className="checkbox-container">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-label">Remember me</span>
              </label>
              <a href="#" className="forgot-password">
                Lost your password?
              </a>
            </div>
            <button className="form-button" type="submit">
              LOGIN
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
