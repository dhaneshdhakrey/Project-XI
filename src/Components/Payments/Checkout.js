import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast, ToastTypes } from '../Toast/Toast-provider';
import './Checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const navigate = useNavigate();
  const addToast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { cardNumber, cardName, expiryDate, cvv } = formData;
    
    if (formData.paymentMethod !== 'paypal') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        addToast('Please fill in all payment details', ToastTypes.ERROR);
        return;
      }
    }

    console.log('Order submitted:', formData);
    addToast('Order Placed Successfully!', ToastTypes.SUCCESS);
    setTimeout(() => navigate('/myspace'), 1000);
  };

  return (
    <div className="checkout-container">
      <h2>Delivery</h2>
      <form onSubmit={handleSubmit}>
        <div className="name-row">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        </div>
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        
        <div className="location-row">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
          <input type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} required />
        </div>
        
        <div className="payment-section">
          <h3>Payment Method</h3>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        {formData.paymentMethod !== 'paypal' && (
          <div className="payment-details">
            <input type="text" name="cardName" placeholder="Name on Card" value={formData.cardName} onChange={handleChange} required />
            <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required pattern="\d{16}" maxLength="16" />
            <div className="card-details-row">
              <input type="text" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} required pattern="\d{2}/\d{2}" maxLength="5" />
              <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} required pattern="\d{3}" maxLength="3" />
            </div>
          </div>
        )}

        {formData.paymentMethod === 'paypal' && (
          <div className="paypal-section">
            <p>You will be redirected to PayPal to complete your payment.</p>
          </div>
        )}

        <button type="submit" className="place-order-btn">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
