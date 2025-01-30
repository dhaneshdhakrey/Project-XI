import React, { useState,useEffect } from "react";
import EmptyCart from "./Empty/Empty";
import Nonempty from "./Non-Empty/Nonempty";
import getCartId from "../../Utils/getCartId";
import Navbar from "../Navbar/Nav";
import Footer from "../Footer/Footer";
import ErrorCard from "../UI/Error";
import {useNavigate} from "react-router-dom";
import axios from "axios";
function CartCont() {
    let navigate=useNavigate();
    let [prevCartId,setCartId]=useState(null);
    let [prevCart,setCart]=useState([]);
    useEffect(()=>{
      async function fetchCartId() {
        const id = await getCartId();
        console.log("Cart ID fetched:", id);
        setCartId(id);
      }
      fetchCartId();
     
    },[])
    useEffect(() => {
      if (prevCartId) {
        fetchCartItems();
      }
    }, [prevCartId]);
   
    
    async function fetchCartItems(){
      
      let data;
      try {
        console.log(prevCartId)
        let response=await axios.get(`http://172.16.112.40:8000/store/carts/${prevCartId}/items/`);
        let data=response.data;
        
        // console.log(response.data)
      
      let temp1 = [];
// for (const key in data) {
//   if (data.hasOwnProperty(key)) { 
//     const item = data[key];
    
    
//     temp1.push({
//       key: key, // Include the key if needed
//       ...item  // Spread operator to include all properties of the item
//     });
//   }
// }


// console.log(temp1); 

      setCart(response.data);
}catch (error) {
        
}
    }

    let Todisplay = <EmptyCart />;

    if(prevCart.length==0){
      Todisplay=<EmptyCart/>  
    } else{
        Todisplay=<Nonempty Products={prevCart}/ >;
    }
    
  return(
    <div>
        <Navbar/>
       
        {Todisplay} 
        
       
        <Footer/>
    </div>
  )
}
export default CartCont;
