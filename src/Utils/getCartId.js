import axios from 'axios';
import BackendAPi from './ConnectBackendAPis'; // Adjust the import path as necessary
const getCartId = async () => {
  let cartId = localStorage.getItem("cartId");

  if (!cartId) {
    try {
      // Request to create a new cart
     
      const response = await axios.post(BackendAPi("carts/"), {}); // Adjust the URL as necessary
      cartId = response.data.id; // Adjust this based on the response format
      localStorage.setItem("cartId", cartId);
    } catch (error) {
      console.error("Error fetching cart ID:", error);
      return null;
    }
  }
  // console.log(cartId);
  return cartId;
};

export default getCartId;
