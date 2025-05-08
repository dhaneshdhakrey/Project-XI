import React, { useState, useEffect } from "react";
import EmptyCart from "./Empty/Empty";
import Nonempty from "./Non-Empty/Nonempty";
import getCartId from "../../Utils/getCartId";
import BackendAPi from "../../Utils/ConnectBackendAPis";
import ErrorCard from "../UI/Error";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CartCont() {
  let navigate = useNavigate();
  let [prevCartId, setCartId] = useState(null);
  let [prevCart, setCart] = useState([]);

  useEffect(() => {
    async function fetchCartId() {
      const id = await getCartId();
      console.log("Cart ID fetched:", id);
      setCartId(id);
    }
    fetchCartId();
  }, []);

  useEffect(() => {
    if (prevCartId) {
      fetchCartItems();
    }
  }, [prevCartId]);

  async function fetchCartItems() {
    try {
      console.log(prevCartId);
      
      // let response = await axios.get(
      //   `http://172.16.112.40:8000/carts/${prevCartId}/items/`
      // );
      let response = await axios.get(
        BackendAPi(`carts/${prevCartId}/items/`)
      );
      
      let data = response.data;

      // Uncomment if transforming data is required
      // let temp1 = [];
      // for (const key in data) {
      //   if (data.hasOwnProperty(key)) {
      //     const item = data[key];
      //     temp1.push({
      //       key: key, // Include the key if needed
      //       ...item,  // Spread operator to include all properties of the item
      //     });
      //   }
      // }

      setCart(data); // Set cart data
    } catch (error) {
      console.error("Error fetching cart items:", error);
      // Optionally render an error card
      // setCart([<ErrorCard message={"Unable to fetch cart items!"} />]);
    }
  }

  let Todisplay = <EmptyCart />;

  if (prevCart.length === 0) {
    Todisplay = <EmptyCart />;
  } else {
    Todisplay = <Nonempty Products={prevCart} />;
  }

  return (
    <div>
      {Todisplay}
    </div>
  );
}

export default CartCont;