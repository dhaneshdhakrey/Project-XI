import React, { useState } from "react";
import "./Nonempty.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import ProductCardinCart from "./CartCard.js";

function Nonempty(props) {
  let [prevProducts,setProducts]=useState(props.Products);

  console.log(prevProducts);
  return (
    <div>
      <div className="Nonempty">
        <h1>Your Cart</h1>
        <a href="/shop">
          <h1>Continue Shopping</h1>
        </a>
      </div>

      <div className="final">
      {props.Products.map((product) => (
        <ProductCardinCart
          key={product.id}
          id={product.id}
          title={product.product.name}
          price={product.product.price}
          image={product.product.image}
          size={product.size}
          quantity={product.quantity}

          />
      ))}

      </div>
    </div>
  );
}

export default Nonempty;
