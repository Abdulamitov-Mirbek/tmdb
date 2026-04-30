// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaGithub, FaHeart } from 'react-icons/fa';
import footerLogo from '../../../assets/img/footerlogo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#021a32]">
      {/* Top Wave Effect */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg 
          className="relative block w-full h-[60px] md:h-[120px]" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 120"
        >
          <path 
            fill="#032541" 
            fillOpacity="1" 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>

      {/* Main Content */}
      <div className="pt-[80px] md:pt-[140px] pb-8">
        <div className="max-w-[1400px] mx-auto px-6">
          
          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-4 group">
                <img 
                  src={footerLogo} 
                  alt="MovieHub" 
                  className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" 
                />
                <span className="text-xl font-bold">
                  <span className="text-white">Movie</span>
                  <span className="text-[#01b4e4]">Hub</span>
                </span>
              </Link>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Your ultimate destination for discovering movies. 
                Browse, search, and explore thousands of films with 
                detailed ratings and reviews.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/50 hover:bg-[#1877F2] hover:text-white transition-all duration-300" aria-label="Facebook">
                  <FaFacebook className="text-sm" />
                </a>
                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/50 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300" aria-label="Twitter">
                  <FaTwitter className="text-sm" />
                </a>
                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/50 hover:bg-[#E4405F] hover:text-white transition-all duration-300" aria-label="Instagram">
                  <FaInstagram className="text-sm" />
                </a>
                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/50 hover:bg-[#FF0000] hover:text-white transition-all duration-300" aria-label="YouTube">
                  <FaYoutube className="text-sm" />
                </a>
                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/50 hover:bg-[#333] hover:text-white transition-all duration-300" aria-label="GitHub">
                  <FaGithub className="text-sm" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#01b4e4] rounded-full"></span>
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/popular" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">
                    Popular Movies
                  </Link>
                </li>
                <li>
                  <Link to="/topRated" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">
                    Top Rated
                  </Link>
                </li>
                <li>
                  <Link to="/upcoming" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">
                    Upcoming
                  </Link>
                </li>
                <li>
                  <Link to="/now-playing" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">
                    Now Playing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Genres */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 relative inline-block">
                Genres
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#01b4e4] rounded-full"></span>
              </h3>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">Action</a></li>
                <li><a href="#" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">Comedy</a></li>
                <li><a href="#" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">Drama</a></li>
                <li><a href="#" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">Horror</a></li>
                <li><a href="#" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">Fantasy</a></li>
                <li><a href="#" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">Romance</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 relative inline-block">
                Support
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#01b4e4] rounded-full"></span>
              </h3>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">Help Center</a></li>
                <li><a href="#" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">Contact Us</a></li>
                <li><a href="#" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-white/50 hover:text-[#01b4e4] transition-colors text-sm inline-block hover:translate-x-1 transform duration-300">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm flex items-center gap-1 flex-wrap justify-center">
                &copy; {currentYear} MovieHub. Made with 
                <FaHeart className="text-red-500 mx-1 animate-pulse" /> 
                by Your Team
              </p>
              <div className="flex items-center gap-3 text-white/40 text-sm">
                <a href="#" className="hover:text-[#01b4e4] transition-colors">Privacy</a>
                <span className="text-white/20">|</span>
                <a href="#" className="hover:text-[#01b4e4] transition-colors">Terms</a>
                <span className="text-white/20">|</span>
                <a href="#" className="hover:text-[#01b4e4] transition-colors">Sitemap</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;