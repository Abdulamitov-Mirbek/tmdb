// MovieDetail.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";

const MovieDetail = () => {
  const [moviedetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();
  const API_KEY = "45d1d56fc54beedb6c0207f9ac6cab7c";

  async function getMovieDetail() {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
      );
      setMovieDetail(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovieDetail();
    window.scrollTo(0, 0);
  }, [movieId]);

  if (loading) {
    return (
      <div id="movieDetail">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="movieDetail"
      style={{
        backgroundImage: moviedetail.backdrop_path
          ? `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${moviedetail.backdrop_path})`
          : "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="detail-overlay">
        <div className="container">
          <div className="movieDetail">
            <div className="movieDetailPoster">
              <img
                src={
                  moviedetail.poster_path
                    ? `https://image.tmdb.org/t/p/w500${moviedetail.poster_path}`
                    : "https://via.placeholder.com/500x750/1a1a2e/ffffff?text=No+Poster"
                }
                alt={moviedetail.title}
              />
            </div>
            <div className="movieDetailText">
              <h2>
                {moviedetail.title}{" "}
                <span>({moviedetail.release_date?.slice(0, 4)})</span>
              </h2>

              <div className="movie-meta-info">
                <span>{moviedetail.release_date}</span>
                {moviedetail.runtime && (
                  <>
                    <span className="separator">|</span>
                    <span>
                      {Math.floor(moviedetail.runtime / 60)}h{" "}
                      {moviedetail.runtime % 60}m
                    </span>
                  </>
                )}
                {moviedetail.genres?.length > 0 && (
                  <>
                    <span className="separator">|</span>
                    <span>
                      {moviedetail.genres
                        ?.map((genre) => genre.name)
                        .join(", ")}
                    </span>
                  </>
                )}
              </div>

              {moviedetail.tagline && (
                <h3 className="tagline">"{moviedetail.tagline}"</h3>
              )}

              <h1>Overview</h1>
              <p>{moviedetail.overview}</p>

              {moviedetail.vote_average > 0 && (
                <div className="rating">
                  <span>
                    Rating: {moviedetail.vote_average.toFixed(1)} / 10
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
