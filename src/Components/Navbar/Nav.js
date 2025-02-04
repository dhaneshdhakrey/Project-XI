import React, { useState, useRef } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import './Nav.css';

function Nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const searchInputRef = useRef(null);

  const apparelItems = ["Topwear", "Bottomwear", "Accessories"];

  function loginHandler() {
    navigate('/myspace');
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

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus the search input when opening
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      // Clear search query when closing
      setSearchQuery("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with query
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    } else {
      // If search query is empty, close the search bar
      setIsSearchOpen(false);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo - Always visible */}
        <div className="navbar-logo" onClick={logoClickHandler}>
          ANOIR
        </div>

        {/* Desktop Navigation Links */}
        <div className={`navbar-links ${isSearchOpen ? 'hide' : ''}`}>
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

        {/* Search Bar */}
        <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
          <form onSubmit={handleSearch}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="search-input"
            />
            <button type="submit" className="search-submit">
              <Search size={16} />
            </button>
            <button type="button" className="search-close" onClick={toggleSearch}>
              <X size={16} />
            </button>
          </form>
        </div>

        {/* Right Side Icons */}
        <div className="navbar-icons">
          <button className="icon-button" onClick={toggleSearch}>
            <Search size={20} />
          </button>
          <button className="icon-button" onClick={cartIconClickHandler}>
            <ShoppingCart size={20} />
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
          <div className="hamlogo">
            <div className="hamnavbar-logo" onClick={logoClickHandler}>
              ANOIR
            </div>
          </div>
          <div className="mobile-links">
            <a href="#" className="mobile-link">Apparel</a>
            <a className="mobile-link" onClick={newinclickhandler}>New In</a>
            <a className="mobile-link" onClick={cartIconClickHandler}>Cart</a>
            <a className="mobile-link" onClick={loginHandler}>Account</a>
            <div className="mobile-search">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mobile-search-input"
                />
                <button type="submit" className="mobile-search-submit">
                  <Search size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;