import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaGithub, FaHeart } from 'react-icons/fa';
import footerLogo from '../../../assets/img/footerlogo.svg';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top Wave Effect */}
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path 
            fill="rgb(3, 37, 65)" 
            fillOpacity="1" 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>

      <div className="footer-content">
        <div className="container">
          {/* Main Footer Grid */}
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-section brand-section">
              <Link to="/" className="footer-logo">
                <img src={footerLogo} alt="MovieHub" />
                <span className="brand-name">MovieHub</span>
              </Link>
              <p className="brand-description">
                Your ultimate destination for discovering movies. 
                Browse, search, and explore thousands of films with 
                detailed ratings and reviews.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <FaYoutube />
                </a>
                <a href="#" className="social-link" aria-label="GitHub">
                  <FaGithub />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/" className="footer-link">Home</Link></li>
                <li><Link to="/popular" className="footer-link">Popular Movies</Link></li>
                <li><Link to="/topRated" className="footer-link">Top Rated</Link></li>
                <li><Link to="/upcoming" className="footer-link">Upcoming</Link></li>
                <li><Link to="/now-playing" className="footer-link">Now Playing</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-section">
              <h3 className="footer-heading">Genres</h3>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Action</a></li>
                <li><a href="#" className="footer-link">Comedy</a></li>
                <li><a href="#" className="footer-link">Drama</a></li>
                <li><a href="#" className="footer-link">Horror</a></li>
                <li><a href="#" className="footer-link">Sci-Fi</a></li>
                <li><a href="#" className="footer-link">Romance</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="footer-section">
              <h3 className="footer-heading">Support</h3>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Help Center</a></li>
                <li><a href="#" className="footer-link">Contact Us</a></li>
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                <li><a href="#" className="footer-link">Terms of Service</a></li>
                <li><a href="#" className="footer-link">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="copyright">
                &copy; {currentYear} MovieHub. Made with <FaHeart className="heart-icon" /> by Your Team
              </p>
              <div className="footer-bottom-links">
                <a href="#" className="bottom-link">Privacy</a>
                <span className="divider">|</span>
                <a href="#" className="bottom-link">Terms</a>
                <span className="divider">|</span>
                <a href="#" className="bottom-link">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;