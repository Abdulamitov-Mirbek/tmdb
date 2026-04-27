// Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaPlay,
  FaStar,
  FaCalendar,
  FaArrowRight,
  FaFire,
} from "react-icons/fa";
import "./Home.css";

const API_KEY = "45d1d56fc54beedb6c0207f9ac6cab7c";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [popularRes, topRatedRes, upcomingRes, trendingRes] =
          await Promise.all([
            axios.get(
              `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
            ),
            axios.get(
              `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
            ),
            axios.get(
              `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
            ),
            axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`),
          ]);

        setPopularMovies(popularRes.data.results.slice(0, 12));
        setTopRatedMovies(topRatedRes.data.results.slice(0, 12));
        setUpcomingMovies(upcomingRes.data.results.slice(0, 12));
        setTrendingMovies(trendingRes.data.results.slice(0, 12));

        // Set a random popular movie as hero
        const randomIndex = Math.floor(
          Math.random() * popularRes.data.results.length,
        );
        setHeroMovie(popularRes.data.results[randomIndex]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner-large"></div>
        <p>Loading amazing movies...</p>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      {heroMovie && (
        <div
          className="hero-section"
          style={{
            backgroundImage: `linear-gradient(rgba(3, 37, 65, 0.8), rgba(3, 37, 65, 0.9)), url(${IMAGE_BASE_URL}/original${heroMovie.backdrop_path})`,
          }}
        >
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">{heroMovie.title}</h1>
                <div className="hero-meta">
                  <span className="hero-rating">
                    <FaStar className="star-icon" />
                    {heroMovie.vote_average.toFixed(1)}
                  </span>
                  <span className="hero-year">
                    <FaCalendar />
                    {heroMovie.release_date?.split("-")[0]}
                  </span>
                </div>
                <p className="hero-overview">{heroMovie.overview}</p>
                <div className="hero-buttons">
                  <button className="btn-primary">
                    <FaPlay /> Watch Trailer
                  </button>
                  <Link to={`/movie/${heroMovie.id}`} className="btn-secondary">
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trending Section */}
      <section className="movie-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FaFire className="section-icon" />
              Trending This Week
            </h2>
            <Link to="/trending" className="view-all">
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="movie-grid">
            {trendingMovies.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="movie-card"
              >
                <div className="movie-poster">
                  <img
                    src={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}/w342${movie.poster_path}`
                        : "https://via.placeholder.com/342x513/1a1a2e/ffffff?text=No+Poster"
                    }
                    alt={movie.title}
                    loading="lazy"
                  />
                  <div className="movie-rating">
                    <FaStar /> {movie.vote_average.toFixed(1)}
                  </div>
                </div>
                <div className="movie-details">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-year">
                    {movie.release_date?.split("-")[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Movies Section */}
      <section className="movie-section bg-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">🔥 Popular Movies</h2>
            <Link to="/popular" className="view-all">
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="movie-grid">
            {popularMovies.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="movie-card"
              >
                <div className="movie-poster">
                  <img
                    src={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}/w342${movie.poster_path}`
                        : "https://via.placeholder.com/342x513/1a1a2e/ffffff?text=No+Poster"
                    }
                    alt={movie.title}
                    loading="lazy"
                  />
                  <div className="movie-rating">
                    <FaStar /> {movie.vote_average?.toFixed(1)}
                  </div>
                </div>
                <div className="movie-details">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-year">
                    {movie.release_date?.split("-")[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="movie-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">⭐ Top Rated</h2>
            <Link to="/topRated" className="view-all">
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="movie-grid">
            {topRatedMovies.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="movie-card"
              >
                <div className="movie-poster">
                  <img
                    src={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}/w342${movie.poster_path}`
                        : "https://via.placeholder.com/342x513/1a1a2e/ffffff?text=No+Poster"
                    }
                    alt={movie.title}
                    loading="lazy"
                  />
                  <div className="movie-rating">
                    <FaStar /> {movie.vote_average?.toFixed(1)}
                  </div>
                </div>
                <div className="movie-details">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-year">
                    {movie.release_date?.split("-")[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Section */}
      <section className="movie-section bg-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">🎬 Coming Soon</h2>
            <Link to="/upcoming" className="view-all">
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="movie-grid">
            {upcomingMovies.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="movie-card"
              >
                <div className="movie-poster">
                  <img
                    src={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}/w342${movie.poster_path}`
                        : "https://via.placeholder.com/342x513/1a1a2e/ffffff?text=No+Poster"
                    }
                    alt={movie.title}
                    loading="lazy"
                  />
                  <div className="movie-rating">
                    <FaCalendar /> {movie.release_date}
                  </div>
                </div>
                <div className="movie-details">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-year">{movie.release_date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>10M+</h3>
              <p>Movies</p>
            </div>
            <div className="stat-card">
              <h3>50K+</h3>
              <p>Reviews</p>
            </div>
            <div className="stat-card">
              <h3>1M+</h3>
              <p>Users</p>
            </div>
            <div className="stat-card">
              <h3>100+</h3>
              <p>Genres</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
