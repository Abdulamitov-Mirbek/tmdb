// Header.jsx
import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes, FaFilm } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import headerlogo from "../../../assets/img/headerlogo.svg";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search logic here
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header id="header" className={isScrolled ? "scrolled" : ""}>
      <div className="container">
        <div className="header">
          <div className="headerLeft">
            <Link to="/" className="logo-link">
              <img src={headerlogo} alt="MovieHub Logo" className="logo" />
            </Link>
          </div>

          <nav className={`headerCenter ${isMobileMenuOpen ? "active" : ""}`}>
            <div className="nav-links">
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                <FaFilm className="nav-icon" />
                <span>Home</span>
              </Link>
              <Link
                to="/popular"
                className={`nav-link ${location.pathname === "/popular" ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-emoji"></span>
                <span>Popular</span>
              </Link>
              <Link
                to="/topRated"
                className={`nav-link ${location.pathname === "/topRated" ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-emoji"></span>
                <span>Top Rated</span>
              </Link>
            </div>
          </nav>

          <div className="headerRight">
            <div className={`search-container ${isSearchOpen ? "active" : ""}`}>
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-submit">
                  <FaSearch />
                </button>
              </form>
            </div>

            <button
              className="search-toggle"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <FaSearch />
            </button>

            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
