import React, { useState } from "react";
import "./Nonempty.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import ProductCardinCart from "./CartCard.js";
import Carttotal from "./Carttotal.js";
function Nonempty(props) {
  let [prevProducts, setProducts] = useState(props.Products);

  //caclulate the total amount 

  const calculateTotalAmount = () => {
    return prevProducts.reduce((total , product)=>{
        return total+ (product.product.price * product.quantity);
    },0);
  };

  const updateProductQuantity = (productId, newQuantity) => {
    setProducts(prevProducts.map(product => 
      product.id === productId 
        ? { ...product, quantity: newQuantity }
        : product
    ));
  };
//console.log(product.price);

  // console.log(prevProducts);
  // console.log(prevProducts[0].product.images)
  return (
    <div className="cartt1">
     

      <div className="final">
        {props.Products.map((product) => (
          <ProductCardinCart
            key={product.id}
            id={product.id}
            title={product.product.name}
            price={product.product.price}
            image={
              product.product.images && product.product.images.length > 0
                ? product.product.images[0].image // Ensure you're accessing the `url` key inside the first image object
                : "default-image.jpg" // Fallback image
            }
            size={product.size}
            quantity={product.quantity}
            onQuantityChange={updateProductQuantity}
          />
        ))}
      </div>
      <Carttotal
        products = {prevProducts}
        totalAmount = {calculateTotalAmount()}
      />
    </div>
  );
}

export default Nonempty;
