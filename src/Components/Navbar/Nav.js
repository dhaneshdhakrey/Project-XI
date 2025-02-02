// src/Nav.js
import React, { useState, useRef } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import './Nav.css';

function Nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const apparelItems = ["Topwear", "Bottomwear", "Accessories"];

  function loginHandler() {
    navigate('/test');
    setIsMenuOpen(false);
  }

  function newinclickhandler() {
    navigate('/newin');
    setIsMenuOpen(false);
  }

  function cartIconClickHandler() {
    navigate('/yourCart');
    setIsMenuOpen(false);
  }

  function logoClickHandler() {
    navigate('/');
    setIsMenuOpen(false);
  }

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={logoClickHandler}>
          ANOIR
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-links">
          <div className="dropdown">
            <div
              className="dropdown-trigger"
              onMouseEnter={() => handleMouseEnter('apparel')}
              onMouseLeave={handleMouseLeave}
              onClick={() => toggleDropdown('apparel')}
            >
              <a href="#" className="navbar-link">
                APPAREL
              </a>
            </div>
            {activeDropdown === 'apparel' && (
              <div
                ref={dropdownRef}
                onMouseEnter={() => handleMouseEnter('apparel')}
                onMouseLeave={handleMouseLeave}
                className="dropdown-menu"
              >
                {apparelItems.map((item, index) => (
                  <a key={index} href="#" className="dropdown-item">
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <a className="navbar-link newinlink" onClick={newinclickhandler}>
              NEW IN
            </a>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="navbar-icons">
        <button className="icon-button">
            <Search size={20} />
          </button>
          <button className="icon-button" onClick={cartIconClickHandler}>
            <ShoppingCart size={20} />
            <span className="icon-badge">0</span>
          </button>
          <button className="icon-button" onClick={loginHandler}>
            <User size={20} />
          </button>
          
        </div>

        {/* Hamburger Button */}
        <button 
          className="hamburger-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="hamlogo">  <div className="hamnavbar-logo" onClick={logoClickHandler}>
          ANOIR
        </div></div>
          <div className="mobile-links">
            <a href="#" className="mobile-link">Apparel</a>
            <a className="mobile-link" onClick={newinclickhandler}>New In</a>
            <a className="mobile-link" onClick={cartIconClickHandler}>Cart</a>
            <a className="mobile-link" onClick={loginHandler}>Account</a>
            <a className="mobile-link">Search</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;