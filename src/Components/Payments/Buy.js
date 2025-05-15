import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import VerifyPayment from "./VerifyPayment";
import "./Buy.css";
import { useToast } from "../Toast/Toast-provider";
// require("dotenv").config();

function Buy() {
  const location = useLocation();
  const navigate=useNavigate();
  const { grand_total, order_id ,backend_orderId} = location.state;
const { toast } = useToast();
  const addToast = useToast();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function   initiatePayment(){
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded yet. Please try again.");
      return;
    }

    const options = {
      key: "rzp_test_nRLazhsKO2CHMl",
      amount: grand_total * 100, // Razorpay expects amount in paise
      currency: "INR",
      name: "Your Store Name",
      description: "Test Order Payment",
      order_id: order_id,
      handler: async function (response) {
        alert(`Payment ID: ${response.razorpay_payment_Id}`);
        // console.log(response,order_id);
       let paymentflag=await VerifyPayment(response,backend_orderId);
         console.log("Payment flag is",paymentflag);
          if(paymentflag){
            console.log("Payment Successful!");
             addToast("Payment Successfull")
             setTimeout(() => {
              navigate('/myspace');
             }, 4000);
          }else{
            //  alert("Payment Failed!");
            addToast("Paymetn Failed")
          }

      },
      prefill: {
        name: "John Doe",
        email: "test12@gmail.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      // eix("Payment Failed: " + response.error.description);
    });
    rzp.open();
  };

  return (
    <div
      className="buy-container"
      style={{
        margin: "150px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxWidth: "400px",
        textAlign: "center",
      }}
    >
      <h1>Proceed to Razorpay</h1>
      <p>Amount: ₹{grand_total}</p>
      <button onClick={initiatePayment}>Pay Now</button>
    </div>
  );
}

export default Buy;
