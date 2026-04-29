import React from 'react';

const MovieCard = ({ movie, index }) => {
    return (
        <>
        <div>
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
        
        {/* {TopRated Grid} */}
         <div className="movie-grid">
          {movies.map((movie, index) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="movie-card"
            >
              <div className="movie-rank">
                #{(currentPage - 1) * 20 + index + 1}
              </div>
              <div className="movie-poster-container">
                <img
                  src={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750/1a1a2e/ffffff?text=No+Poster"
                  }
                  alt={movie.title}
                  className="movie-poster"
                  loading="lazy"
                />
                <div className="movie-overlay">
                  <div className="overlay-content">
                    <span className="overlay-rating">
                      <FaStar /> {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="movie-info">
                <h2 className="movie-title">{movie.title}</h2>
                <div className="movie-meta">
                  <span className="movie-year">
                    <FaCalendar />
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "TBA"}
                  </span>
                </div>
                <div className="movie-rating-container">
                  <div className="rating-bar-bg">
                    <div
                      className="rating-bar-fill"
                      style={{
                        width: `${(movie.vote_average / 10) * 100}%`,
                        backgroundColor: getRatingColor(movie.vote_average),
                      }}
                    ></div>
                  </div>
                  <div className="rating-details">
                    <span
                      className="rating-score"
                      style={{ color: getRatingColor(movie.vote_average) }}
                    >
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="rating-badge">
                      {getRatingBadge(movie.vote_average)}
                    </span>
                  </div>
                </div>
                <p className="movie-overview">
                  {movie.overview || "No overview available."}
                </p>
              </div>
            </Link>
          ))}
        </div>
        </>
    );
};

export default MovieCard;