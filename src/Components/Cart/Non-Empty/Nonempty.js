import React, { useState } from "react";
import "./Nonempty.css";
// import { RiDeleteBin6Line } from "react-icons/ri";
import ProductCardinCart from "./CartCard.js";
import Carttotal from "./Carttotal.js";
import getCartId from "../../../Utils/getCartId.js";
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

 async function handleDeleteProduct(cartItemId){
        try{
          const cartid = await getCartId();
          const response = await fetch(`https://projectxi.onrender.com/carts/${cartid}/items/${cartItemId}/`, {
            method: 'DELETE',
          });

          if (response.ok) {
            // Item deleted successfully
            setProducts(prevProducts => prevProducts.filter(item => item.id !== cartItemId));
          } else {
            console.error("Failed to delete item from cart");
          }
        } catch (error) {
          console.error("Error deleting item:", error);
        }

 }

  return (
    <div className="cartt1">
     

      <div className="final">
        {prevProducts.map((product) => (
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
            onDelete={handleDeleteProduct}
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
