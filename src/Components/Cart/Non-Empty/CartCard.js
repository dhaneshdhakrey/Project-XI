import React, { useState } from 'react';
import './Productcart.css'; // Importing the CSS file
import { RiDeleteBin6Line } from "react-icons/ri";
import Update_Quantity from '../../../Utils/Update_Quantity_Controller';

const ProductCard = (props) => {
  let [prevQuantity, setQuantity] = useState(props.quantity);

  async function incrementHandler(flag) {
    let newQuantity = flag === "+" ? prevQuantity + 1 : prevQuantity - 1;
    console.log(newQuantity);
    // Prevent quantity from going below 1
    if (newQuantity < 1) return;

    let success = await Update_Quantity({ id: props.id, quantity: newQuantity, size: props.size,flag: flag });
    
    if (success) {
      setQuantity(newQuantity);
      //props.onQuantitychange(props.id, newQuantity);
    } else {
      console.error("Failed to update quantity");
    }
  }

  return (
    <div className="card2">
      <div className="card2-header">
        <img src={props.image} className="product-image" />
        <div className="product-details">
          <h2 className="product-title">{props.title}</h2>
          <p className="product-price">{props.price}</p>
          <p className="product-size"> size: {props.size}</p>
        </div>
        <div className="quantity-controls">
          <button className="button decrement" onClick={() => incrementHandler("-")}>−</button>
          <input type="number" value={prevQuantity} className="quantity-input" readOnly />
          <button className="button increment" onClick={() => incrementHandler("+")}>+</button>
        </div>
        <button className="button delete">
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
