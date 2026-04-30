// MovieDetail.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaStar, FaCalendar, FaClock } from "react-icons/fa";

const MovieDetail = () => {
  const [moviedetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();
  const API_KEY = "45d1d56fc54beedb6c0207f9ac6cab7c";

  async function getMovieDetail() {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
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
      <div className="min-h-screen bg-[#032541] pt-[80px]">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-white/10 border-t-[#01b4e4] rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#032541] relative">
      {/* Backdrop Image */}
      {moviedetail.backdrop_path && (
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${moviedetail.backdrop_path}`}
            alt=""
            className="w-full h-[60vh] object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#032541]/50 via-[#032541]/90 to-[#032541]"></div>
        </div>
      )}

      <div className="relative pt-[100px] pb-12">
        <div className="max-w-[1400px] mx-auto px-5">
          {/* Back Button */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <FaArrowLeft /> Back to Home
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={
                  moviedetail.poster_path
                    ? `https://image.tmdb.org/t/p/w500${moviedetail.poster_path}`
                    : "https://via.placeholder.com/500x750/1a1a2e/ffffff?text=No+Poster"
                }
                alt={moviedetail.title}
                className="w-64 md:w-80 rounded-2xl shadow-2xl shadow-black/50"
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {moviedetail.title}
                <span className="text-white/50 font-normal ml-2">
                  ({moviedetail.release_date?.slice(0, 4)})
                </span>
              </h2>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 text-white/70 mb-6">
                <span className="flex items-center gap-1">
                  <FaCalendar className="text-[#01b4e4]" />
                  {moviedetail.release_date}
                </span>
                <span className="text-[#01b4e4] font-bold">|</span>
                {moviedetail.runtime > 0 && (
                  <>
                    <span className="flex items-center gap-1">
                      <FaClock className="text-[#01b4e4]" />
                      {Math.floor(moviedetail.runtime / 60)}h {moviedetail.runtime % 60}m
                    </span>
                    <span className="text-[#01b4e4] font-bold">|</span>
                  </>
                )}
                <div className="flex flex-wrap gap-2">
                  {moviedetail.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-[#01b4e4]/20 border border-[#01b4e4]/30 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tagline */}
              {moviedetail.tagline && (
                <p className="text-lg text-white/50 italic mb-6">"{moviedetail.tagline}"</p>
              )}

              {/* Rating */}
              {moviedetail.vote_average > 0 && (
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#01b4e4]/20 border-2 border-[#01b4e4] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold text-[#01b4e4]">
                        {moviedetail.vote_average.toFixed(1)}
                      </div>
                      <div className="text-xs text-white/50">/10</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < Math.round(moviedetail.vote_average / 2) ? "text-yellow-400" : "text-gray-600"}
                        />
                      ))}
                    </div>
                    <p className="text-white/50 text-sm mt-1">User Score</p>
                  </div>
                </div>
              )}

              {/* Overview */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Overview</h3>
                <p className="text-white/70 leading-relaxed text-lg">
                  {moviedetail.overview || "No overview available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;