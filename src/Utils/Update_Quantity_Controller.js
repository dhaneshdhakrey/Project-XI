import getCartId from "./getCartId";
import axios from "axios";

async function Update_Quantity({ id, quantity, size, flag }) {
  try {
    const cartid1 = await getCartId();
    if (!cartid1) {
      console.log("Cart ID not available");
      return false;
    }
    let body;
    if (flag === "+") {
      body = { product_id: id, quantity: quantity + 1, size: size };
    } else {
      body = { product_id: id, quantity: quantity - 1, size: size };
    }
    console.log(body);
    let url = `http://172.16.112.40:8000/store/carts/${cartid1}/items/${id}/`;
    console.log(url);
    let response = await axios.patch(url, body);
    console.log("Response Data:", response.data);
    console.log("Response Status:", response.status);

   return response.status===200;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
  return true;
}

export default Update_Quantity;
