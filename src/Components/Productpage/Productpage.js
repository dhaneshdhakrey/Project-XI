import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useToast } from '../Toast/Toast-provider'; // Import the toast hook
import getCartId from '../../Utils/getCartId';
import ErrorCard from '../UI/Error';
import Loading from '../UI/Loading';
import axios from 'axios';
import BackendAPi from '../../Utils/ConnectBackendAPis';
import './Productpage.css'; // Import the new CSS file

const buttonClasses = 'product-button';
const imageClasses = 'image-thumbnail';
const textClasses = 'text-sm font-medium';

function ProductDetail() {
  const addToast = useToast();
  const { productId } = useParams();
  const { toast } = useToast(); // Initialize toast
  let [prevProduct, setProduct] = useState([]);
  let [prevIsLoading, setIsLoading] = useState(false);
  let [prevError, setError] = useState(null);
  const [cartid1, setCartId] = useState(null);

  async function fetchproduct() {
    setError(null);
    setIsLoading(true);
    try {
      // let response = await axios.get(`http://172.16.112.40:8000/products/${productId}`);
      let response = await axios.get(BackendAPi(`products/${productId}`));
      setProduct(response.data);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
    setIsLoading(false);
  }

  async function addtoCartHandler() {
    try {
      let body = { product_id: prevProduct.id, quantity: "1", size: "1" };
      // let url = `http://172.16.112.40:8000/carts/${cartid1}/items/`;
      let url = BackendAPi(`carts/${cartid1}/items/`);
      let response = await axios.post(url, body);

      addToast("Success: Item added to cart!");
    } catch (error) {
      addToast({ message: "Error: Item not added in the cart!" });
      console.log(error.message);
    }
  }

  useEffect(() => {
    async function fetchCartId() {
      const id = await getCartId();
      setCartId(id);
    }
    fetchCartId();
    fetchproduct();
  }, []);

  return (
    <React.Fragment>
      {prevIsLoading && <Loading />}
      {!prevIsLoading && !prevError && Object.keys(prevProduct).length > 0 && (
        <div className="product-container product-container-md">
          <div className="image-container">
            <img
              src={prevProduct.images?.[0]?.image || "fallback.jpg"}
              alt="Product Image"
              className="image-main"
            />
            <div className="image-thumbnails">
              <img src="https://openui.fly.dev/openui/200x200.svg?text=Image1" alt="Image 1" className={imageClasses} />
              <img src="https://openui.fly.dev/openui/200x200.svg?text=Image2" alt="Image 2" className={imageClasses} />
              <img src="https://openui.fly.dev/openui/200x200.svg?text=Image3" alt="Image 3" className={imageClasses} />
              <img src="https://openui.fly.dev/openui/200x200.svg?text=Image4" alt="Image 4" className={imageClasses} />
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">{prevProduct.title}</h1>
            <p className="product-price">Rs.{prevProduct.price}</p>
            <p className="product-tax">Tax included. Shipping calculated at checkout.</p>

            <div className="product-size">
              <label className={textClasses}>SIZE</label>
              <div className="flex space-x-2">
                <button className={buttonClasses}>S</button>
                <button className={buttonClasses}>M</button>
                <button className={buttonClasses}>L</button>
                <button className={buttonClasses}>XL</button>
                <button className={buttonClasses}>XXL</button>
              </div>
            </div>
            <div className="product-material">
              <label className={textClasses}>MATERIAL</label>
              <button className={buttonClasses}>POLYESTER COTTON</button>
            </div>
            <div className="product-quantity">
              <label className={textClasses}>Quantity</label>
              <div className="count">
                <button className="">-</button>
                <span className="text-lg">1</span>
                <button className="">+</button>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button onClick={addtoCartHandler} className="product-button-primary">Add To Cart</button>
            </div>

            <p className="product-description">
              {prevProduct.description}
            </p>
          </div>
        </div>
      )}
      {!prevIsLoading && prevError && <p><ErrorCard message='Your product will appear here'></ErrorCard></p>}
    </React.Fragment>
  );
}

export default ProductDetail;
