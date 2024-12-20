import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Empty.css'
import Navbar from '../Navbar/Nav'
import Footer from '../Footer/Footer'

function Empty() {
  const navigate = useNavigate();
  function ordernowClickHandler() {
    navigate('/');
  }
  return (
    <div>
    <Navbar/>
    <div className='Empty'>
        <h1>Your Cart is empty</h1>

        <p>Looks like you haven't added anything to your cart yet.</p>

        <div className='button' onClick={ordernowClickHandler}>
            <button >Order Now</button>
        </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Empty