import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/HomePage/Home";
import Login from "./Components/Users_Data/Login";
//import Productcart from "./Components/Cart/Non-Empty/CartCard";
import LoginController from "./Components/Users_Data/Login_Controller";
import MyOrders from "./Components/Users_Data/MySpace/MyOrders";
//import Footer from "./Components/Footer/Footer";
import Cart from "./Components/Cart/CartCont"
import Productpage from "./Components/Productpage/Productpage";
import Signup from "./Components/Users_Data/Signup";
import Dashboard from "./Components/Users_Data/MySpace/Dashboard";


function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products/:productId" element={<Productpage/>}/>
        <Route path="/test" element={<LoginController/>}/>
        <Route path="/myorders" element={<MyOrders/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/yourCart" element={<Dashboard/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
