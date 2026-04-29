// TopRated.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStar, FaCalendar, FaArrowUp, FaFilter } from "react-icons/fa";
import "./TopRated.css";
import MovieCard from "../movieCard/MovieCard";

const API_KEY = "45d1d56fc54beedb6c0207f9ac6cab7c";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("vote_average");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`,
        );

        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch top rated movies");
        setLoading(false);
        console.error("Error:", err);
      }
    };

    fetchTopRated();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
    const sortedMovies = [...movies].sort((a, b) => {
      switch (criteria) {
        case "vote_average":
          return b.vote_average - a.vote_average;
        case "title":
          return a.title.localeCompare(b.title);
        case "release_date":
          return new Date(b.release_date) - new Date(a.release_date);
        case "popularity":
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });
    setMovies(sortedMovies);
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return "#4CAF50";
    if (rating >= 7) return "#8BC34A";
    if (rating >= 6) return "#FFA726";
    if (rating >= 5) return "#FF9800";
    return "#f44336";
  };

  const getRatingBadge = (rating) => {
    if (rating >= 8.5) return " Masterpiece";
    if (rating >= 8) return " Excellent";
    if (rating >= 7) return " Great";
    if (rating >= 6) return " Good";
    if (rating >= 5) return " Average";
    return " Poor";
  };

  if (loading) {
    return (
      <div className="toprated-loading">
        <div className="loading-spinner-large"></div>
        <p>Loading top rated movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="toprated-error">
        <div className="error-content">
          <span className="error-icon">⚠️</span>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="toprated">
      {/* Hero Banner */}
      <div className="toprated-hero">
        <div className="container">
          <h1 className="hero-title">
            <span className="title-icon"></span>
            Top Rated Movies
            <span className="title-line"></span>
          </h1>
          <p className="hero-subtitle">
            Discover the highest rated movies of all time
          </p>
        </div>
      </div>

      <div className="container">
        {/* Controls Bar */}
        <div className="controls-bar">
          <div className="results-info">
            <span className="results-count">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="sort-controls">
            <FaFilter className="filter-icon" />
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="vote_average">Sort by Rating</option>
              <option value="title">Sort by Title</option>
              <option value="release_date">Sort by Release Date</option>
              <option value="popularity">Sort by Popularity</option>
            </select>
          </div>
        </div>

        {/* Movie Grid */}
        {movies.map((movie, index) => (
          <MovieCard el={movie, index} />
        ))};

        {/* Pagination */}
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <div className="page-numbers">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  className={`page-num ${currentPage === pageNum ? "active" : ""}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="page-dots">...</span>
                <button
                  className="page-num"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            className="page-btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default TopRated;
