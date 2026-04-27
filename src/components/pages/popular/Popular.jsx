// Popular.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlay,
  FaInfoCircle,
  FaStar,
  FaCalendar,
  FaLanguage,
} from "react-icons/fa";
import "./Popular.css";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [activeGenre, setActiveGenre] = useState("all");

  async function getPopular() {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=45d1d56fc54beedb6c0207f9ac6cab7c&language=en-US&page=1`,
      );

      const { results } = response.data;
      setPopular(results);
      setLoading(false);
    } catch (err) {
      setError("Unable to load popular films. Please check your connection.");
      setLoading(false);
      console.error("Error fetching popular movies:", err);
    }
  }

  useEffect(() => {
    getPopular();
  }, []);

  const getRatingClass = (rating) => {
    if (rating >= 8) return "rating-high";
    if (rating >= 6) return "rating-medium";
    return "rating-low";
  };

  const getRatingLabel = (rating) => {
    if (rating >= 8.5) return "Exceptional";
    if (rating >= 8) return "Outstanding";
    if (rating >= 7) return "Very Good";
    if (rating >= 6) return "Good";
    if (rating >= 5) return "Average";
    return "Poor";
  };

  if (loading) {
    return (
      <section id="popular">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p className="loading-text">Curating popular films for you...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="popular">
        <div className="container">
          <div className="error-state">
            <div className="error-icon">!</div>
            <h2 className="error-title">Service Interruption</h2>
            <p className="error-message">{error}</p>
            <button onClick={getPopular} className="retry-button">
              Attempt Recovery
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="popular">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="header-content">
            <h1 className="section-title">
              Popular Now
              <span className="title-accent"></span>
            </h1>
            <p className="section-subtitle">
              The most watched films worldwide, updated daily
            </p>
          </div>
          <div className="header-stats">
            <span className="stat-item">
              <span className="stat-value">{popular.length}</span>
              <span className="stat-label">Films</span>
            </span>
          </div>
        </div>

        {/* Movie Grid */}
        <div className="popular-grid">
          {popular.map((movie, index) => (
            <Link
              to={`/movie/${movie.id}`}
              className="movie-card"
              key={movie.id}
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              {/* Rank Number */}
              <div className="movie-rank">
                <span className="rank-number">{index + 1}</span>
              </div>

              {/* Poster */}
              <div className="movie-poster-container">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : "https://via.placeholder.com/500x750/1a1a2e/b8b0a0?text=No+Poster+Available"
                  }
                  alt={`${movie.title} poster`}
                  className="movie-poster"
                  loading="lazy"
                />

                {/* Rating Overlay */}
                <div
                  className={`movie-rating ${getRatingClass(movie.vote_average)}`}
                >
                  <FaStar className="rating-icon" />
                  <div className="rating-content">
                    <span className="rating-score">
                      {movie.vote_average?.toFixed(1)}
                    </span>
                    <span className="rating-label">
                      {getRatingLabel(movie.vote_average)}
                    </span>
                  </div>
                </div>

                {/* Hover Overlay */}
                {hoveredMovie === movie.id && (
                  <div className="movie-overlay">
                    <div className="overlay-backdrop"></div>
                    <div className="overlay-content">
                      <button className="overlay-button primary">
                        <FaPlay /> View Trailer
                      </button>
                      <button className="overlay-button secondary">
                        <FaInfoCircle /> Details
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Movie Details */}
              <div className="movie-details">
                <h2 className="movie-title">{movie.title}</h2>

                <div className="movie-meta">
                  <span className="meta-item">
                    <FaCalendar className="meta-icon" />
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "TBA"}
                  </span>
                  <span className="meta-divider"></span>
                  <span className="meta-item">
                    <FaLanguage className="meta-icon" />
                    {movie.original_language?.toUpperCase() || "N/A"}
                  </span>
                </div>

                {/* Rating Bar */}
                <div className="rating-bar-container">
                  <div className="rating-bar">
                    <div
                      className="rating-bar-fill"
                      style={{
                        width: `${(movie.vote_average / 10) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="rating-text">
                    {movie.vote_average?.toFixed(1)} / 10
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;
