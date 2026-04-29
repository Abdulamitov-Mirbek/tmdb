// MovieCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaCalendar,
  FaPlay,
  FaInfoCircle,
  FaLanguage,
} from "react-icons/fa";

const MovieCard = ({ movie, index }) => {
  // Return null if movie is undefined or null
  if (!movie) {
    return null;
  }

  const getRatingColor = (rating) => {
    if (!rating) return "#666";
    if (rating >= 8) return "#4CAF50";
    if (rating >= 7) return "#8BC34A";
    if (rating >= 6) return "#FFA726";
    if (rating >= 5) return "#FF9800";
    return "#f44336";
  };

  const getRatingLabel = (rating) => {
    if (!rating) return "N/A";
    if (rating >= 8) return "Excellent";
    if (rating >= 7) return "Great";
    if (rating >= 6) return "Good";
    if (rating >= 5) return "Average";
    return "Poor";
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      {/* Rank Number */}
      {index !== undefined && (
        <div className="movie-rank">
          <span className="rank-number">{index + 1}</span>
        </div>
      )}

      {/* Poster */}
      <div className="movie-poster-container">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "https://via.placeholder.com/500x750/1a1a2e/ffffff?text=No+Poster"
          }
          alt={movie.title || "Movie poster"}
          className="movie-poster"
          loading="lazy"
        />

        {/* Rating Level Badge */}
        {movie.vote_average && (
          <div
            className="movie-rating-badge"
            style={{ backgroundColor: getRatingColor(movie.vote_average) }}
          >
            <FaStar style={{ color: "#FFD700", fontSize: "12px" }} />
            <span className="rating-number">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="movie-overlay">
          <div className="overlay-backdrop"></div>
          <div className="overlay-content">
            <button className="overlay-button primary">
              <FaPlay /> Trailer
            </button>
            <button className="overlay-button secondary">
              <FaInfoCircle /> Details
            </button>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="movie-details">
        <h2 className="movie-title">{movie.title || "Untitled"}</h2>

        <div className="movie-meta">
          <span className="meta-item">
            <FaCalendar className="meta-icon" />
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "TBA"}
          </span>
          <span className="meta-divider">•</span>
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
                width: `${((movie.vote_average || 0) / 10) * 100}%`,
                backgroundColor: getRatingColor(movie.vote_average),
              }}
            ></div>
          </div>
          <span className="rating-text">
            {movie.vote_average?.toFixed(1) || "N/A"} / 10
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
