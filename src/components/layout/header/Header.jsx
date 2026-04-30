// Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaBars, FaTimes, FaStar, FaCalendar } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import headerlogo from "../../../assets/img/headerlogo.svg";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchRef = useRef(null);
  const searchTimeout = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const API_KEY = "45d1d56fc54beedb6c0207f9ac6cab7c";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close search on route change
  useEffect(() => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  }, [location.pathname]);

  // Debounced search
  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (query.trim().length >= 2) {
      searchTimeout.current = setTimeout(() => {
        fetchSearchResults(query);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      setSearchLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`,
      );
      setSearchResults(response.data.results?.slice(0, 8) || []);
      setSearchLoading(false);
    } catch (error) {
      console.error("Search error:", error);
      setSearchLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleResultClick = (movieId) => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/movie/${movieId}`);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/popular", label: "Popular" },
    { to: "/topRated", label: "Top Rated" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#032541] shadow-2xl shadow-black/30 backdrop-blur-xl border-b border-white/5"
          : "bg-gradient-to-b from-[#032541] to-[#032541]/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src={headerlogo}
                  alt="MovieHub"
                  className="w-10 h-10 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#01b4e4]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <span className="hidden md:inline text-xl font-bold tracking-wide">
                <span className="text-white">Movie</span>
                <span className="text-[#01b4e4]">Hub</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#01b4e4]/20 to-[#90cea1]/10 rounded-lg border border-[#01b4e4]/20 shadow-lg shadow-[#01b4e4]/10"></div>
                  )}
                  <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-[#01b4e4] to-[#90cea1] rounded-full"></div>
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search Section */}
            <div ref={searchRef} className="relative">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="relative w-10 h-10 flex items-center justify-center rounded-lg text-white/60 hover:text-white transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaSearch className="text-lg relative z-10" />
              </button>

              {/* Search Dropdown */}
              {searchOpen && (
                <div className="absolute top-full right-0 mt-2 w-[350px] md:w-[400px] bg-[#032541] border border-white/10 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden">
                  {/* Search Input */}
                  <form
                    onSubmit={handleSearchSubmit}
                    className="p-3 border-b border-white/5"
                  >
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                      <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={handleSearchInput}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm outline-none focus:border-[#01b4e4] transition-colors placeholder:text-white/30"
                        autoFocus
                      />
                      {searchLoading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-[#01b4e4] rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </form>

                  {/* Search Results */}
                  <div className="max-h-[400px] overflow-y-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map((movie) => (
                        <button
                          key={movie.id}
                          onClick={() => handleResultClick(movie.id)}
                          className="w-full flex items-start gap-3 p-3 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-b-0"
                        >
                          {/* Movie Poster */}
                          <div className="flex-shrink-0 w-10 h-14 rounded overflow-hidden bg-[#0a1526]">
                            <img
                              src={
                                movie.poster_path
                                  ? `https://image.tmdb.org/t/p/w92/${movie.poster_path}`
                                  : "https://via.placeholder.com/92x138/1a1a2e/ffffff?text=N/A"
                              }
                              alt={movie.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Movie Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium truncate">
                              {movie.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="flex items-center gap-1 text-[#FFD700] text-xs">
                                <FaStar className="text-[10px]" />
                                {movie.vote_average?.toFixed(1)}
                              </span>
                              <span className="text-white/30 text-xs">•</span>
                              <span className="text-white/40 text-xs flex items-center gap-1">
                                <FaCalendar className="text-[10px]" />
                                {movie.release_date?.split("-")[0] || "TBA"}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : searchQuery.length >= 2 ? (
                      <div className="p-6 text-center">
                        <p className="text-white/40 text-sm">
                          No results found
                        </p>
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <FaSearch className="text-white/10 text-3xl mx-auto mb-2" />
                        <p className="text-white/30 text-sm">
                          Type to search movies
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-6 bg-white/10 mx-1"></div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-white/60 hover:text-white transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-lg" />
              ) : (
                <FaBars className="text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-white/5 py-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`relative px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-[#01b4e4]/20 to-[#90cea1]/10 border border-[#01b4e4]/20"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-[#01b4e4] to-[#90cea1] rounded-r-full"></div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
