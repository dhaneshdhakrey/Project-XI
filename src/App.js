import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./Components/Toast/Toast-provider";
import Home from "./Components/HomePage/Home";
import Login from "./Components/Users_Data/Login";
//import Productcart from "./Components/Cart/Non-Empty/CartCard";
import LoginController from "./Components/Users_Data/Login_Controller";
import MyOrders from "./Components/Users_Data/MySpace/MyOrders";
import Footer from "./Components/Footer/Footer";
import Cart from "./Components/Cart/CartCont"
import Productpage from "./Components/Productpage/Productpage";
import Signup from "./Components/Users_Data/Signup";
import Dashboard from "./Components/Users_Data/MySpace/Dashboard";
import Newproducts from "./Components/Collection/Newproducts/Newproducts";
import Navbar from "./Components/Navbar/Nav";
import Checkout from "./Components/Payments/Checkout";
import SearchPage from "./Components/Search/search";
import { Search } from "lucide-react";
function App() {
  return (
    <ToastProvider>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='searchpage/:query' element={<SearchPage/>} />
        <Route path="/products/:productId" element={<Productpage/>}/>
        <Route path="/myspace" element={<LoginController/>}/>
        <Route path="/myorders" element={<MyOrders/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/yourCart" element={<Cart/>} />
        <Route path="/newin" element={<Newproducts/>} />
        <Route path="/checkout" element={<Checkout/>} />
        {/* < */}
      </Routes>
      <Footer />
    </Router>
    </ToastProvider>
  );
}

export default App;
