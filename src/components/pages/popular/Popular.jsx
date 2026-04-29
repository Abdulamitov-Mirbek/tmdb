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
// import "./Popular.css";
import MovieCard from "../movieCard/MovieCard";

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
        {popular.map((movie, index) => (

        <MovieCard el={movie, index} />
        ))};
      </div>
    </section>
  );
};

export default Popular;
