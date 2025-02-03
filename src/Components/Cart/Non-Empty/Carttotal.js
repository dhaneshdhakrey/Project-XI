import React from 'react'
import './Carttotal.css'
import { useNavigate } from 'react-router-dom';
function Carttotal({ products, totalAmount }) {
    const subtotal = totalAmount;

    const navigate = useNavigate();
    const Handleproceedtocheckout=()=>{
        navigate('/checkout');
    }
    
  return (
    
       <div className="cart-totals">
        <h2>CART TOTALS</h2>
        
        <div className="totals-row">
          <span>Subtotal</span>
          <span>₹{totalAmount}</span>
        </div>
        
        <div className="shipping-calculator">
          <h3>Calculate Shipping</h3>
          <p className="shipping-note">Free shipping</p>
          <p className="shipping-update">Shipping options will be updated during checkout.</p>
        </div>
        
        <div className="total-row">
          <span>TOTAL</span>
          <span>₹{totalAmount}</span>
        </div>
        
        <button onClick={Handleproceedtocheckout} className="checkout-button">PROCEED TO CHECKOUT</button>
      </div>
  )
}

export default Carttotal
