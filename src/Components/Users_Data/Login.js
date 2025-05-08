import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Importing the CSS file
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Footer";
import BackendAPi from "../../Utils/ConnectBackendAPis";
import { useToast ,ToastTypes } from "../Toast/Toast-provider";
const LoginForm = () => {

  const addToast = useToast();
  async function submitHandler(event) {
    event.preventDefault();
    let credentials = {
      email: prevMail,
      password: prevPassword,
    };
    console.log(credentials);
    try {
      // let url = `http://172.16.112.40:8000/login/`;
      let url = BackendAPi("login/");
      console.log("gg guys",url);

      let response = await axios.post(url, credentials);
      console.log("Success:", response.data);
      console.log(response.data.access);
      localStorage.setItem("isLoggedIn",response.data.access);
      addToast("You have successfully logged in.", ToastTypes.SUCCESS, 3000);
      setTimeout(() => {
        window.location.href = "/"; // Redirect to login page after 2 seconds
    }, 2000);
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
     
      <div className="login-container">
        <div className="login-card">
          {/* <LoginController /> */}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
               Email Address *
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
    </div>
  );
};

export default LoginForm;
