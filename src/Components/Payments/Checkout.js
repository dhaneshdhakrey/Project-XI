import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast, ToastTypes } from '../Toast/Toast-provider';
import getCartId from '../../Utils/getCartId';
import axios from 'axios';
import './Checkout.css';
import BackendAPi from '../../Utils/ConnectBackendAPis';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    apartment_address: '',
    street_address: '',
    postal_code: '',
    city: '',
    state: '',
    country: ''
  });

  
  let cart_id;
  const navigate = useNavigate();
  const addToast = useToast();
  let navigate1 = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      cart_id= await getCartId();
      let loginauth = localStorage.getItem('isLoggedIn');
      console.log(loginauth);
      
      let newformData={...formData,cart_id};
            console.log(newformData);
      let response= await axios.post(BackendAPi('orders/'), newformData,{
        headers: {
          Authorization: `JWT ${loginauth}`
        }
      });

      console.log(response.data);
 if(response.status=='200'){
  navigate('/buy',{state:{
    backend_orderId:response.data.id,
    grand_total: response.data.grand_total,
    order_id: response.data.razorpay_order_id}
  });
 }



      // addToast('Order Placed Successfully!', ToastTypes.SUCCESS);
      // setTimeout(() => navigate('/myspace'), 1000);
    } catch (error) {
      console.error('Order error:', error.message);
      addToast('Failed to place order.', ToastTypes.ERROR);
    }
  };



  return (
    <div className="checkout-container">
      <h2>Delivery</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} required />
        <input type="text" name="apartment_address" placeholder="Apartment Address" value={formData.apartment_address} onChange={handleChange} required />
        <input type="text" name="street_address" placeholder="Street Address" value={formData.street_address} onChange={handleChange} required />

        <div className="location-row">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
          <input type="text" name="postal_code" placeholder="Postal Code" value={formData.postal_code} onChange={handleChange} required />
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        </div>

        <button type="submit" className="place-order-btn">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Checkout;
