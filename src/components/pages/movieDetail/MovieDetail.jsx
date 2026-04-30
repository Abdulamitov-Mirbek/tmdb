// MovieDetail.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaStar, FaCalendar, FaClock, FaUsers } from "react-icons/fa";
import Actors from "../actors/Actors";

const MovieDetail = () => {
  const [moviedetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [showActors, setShowActors] = useState(false);
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
    setShowActors(false); // Reset actors view when movie changes
  }, [movieId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#032541] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/10 border-t-[#01b4e4] rounded-full animate-spin"></div>
          <p className="text-white/60">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!moviedetail.id) {
    return (
      <div className="min-h-screen bg-[#032541] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 text-lg">Movie not found</p>
          <Link to="/" className="text-[#01b4e4] hover:underline mt-2 inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#032541]">
      {/* Backdrop Image */}
      {moviedetail.backdrop_path && (
        <div className="absolute top-0 left-0 right-0 h-[60vh] overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${moviedetail.backdrop_path}`}
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#032541]/40 via-[#032541]/80 to-[#032541]"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative pt-[80px] pb-12">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-64 md:w-80 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <img
                  src={
                    moviedetail.poster_path
                      ? `https://image.tmdb.org/t/p/w500${moviedetail.poster_path}`
                      : "https://via.placeholder.com/500x750/1a1a2e/ffffff?text=No+Poster"
                  }
                  alt={moviedetail.title}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex-1 text-white">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                {moviedetail.title}
                <span className="text-white/50 font-normal ml-2 text-2xl">
                  ({moviedetail.release_date?.slice(0, 4)})
                </span>
              </h1>

              {/* Tagline */}
              {moviedetail.tagline && (
                <p className="text-lg text-white/40 italic mb-6">"{moviedetail.tagline}"</p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 text-white/60 text-sm mb-6">
                <span className="flex items-center gap-1.5">
                  <FaCalendar className="text-[#01b4e4]" />
                  {moviedetail.release_date || 'TBA'}
                </span>
                <span className="text-[#01b4e4] font-bold">•</span>
                {moviedetail.runtime > 0 && (
                  <>
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-[#01b4e4]" />
                      {Math.floor(moviedetail.runtime / 60)}h {moviedetail.runtime % 60}m
                    </span>
                    <span className="text-[#01b4e4] font-bold">•</span>
                  </>
                )}
                <div className="flex flex-wrap gap-2">
                  {moviedetail.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-[#01b4e4]/15 border border-[#01b4e4]/25 rounded-full text-xs text-white/80"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-[#01b4e4]/15 border-2 border-[#01b4e4] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-bold text-[#01b4e4]">
                      {moviedetail.vote_average?.toFixed(1)}
                    </div>
                    <div className="text-[10px] text-white/40">/10</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.round(moviedetail.vote_average / 2)
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-white/40 text-xs">User Score • {moviedetail.vote_count?.toLocaleString()} votes</p>
                </div>
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Overview</h3>
                <p className="text-white/65 leading-relaxed">
                  {moviedetail.overview || "No overview available."}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {moviedetail.budget > 0 && (
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider">Budget</p>
                    <p className="text-white/80 font-medium">${(moviedetail.budget / 1000000).toFixed(1)}M</p>
                  </div>
                )}
                {moviedetail.revenue > 0 && (
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider">Revenue</p>
                    <p className="text-white/80 font-medium">${(moviedetail.revenue / 1000000).toFixed(1)}M</p>
                  </div>
                )}
                {moviedetail.status && (
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider">Status</p>
                    <p className="text-white/80 font-medium">{moviedetail.status}</p>
                  </div>
                )}
                {moviedetail.original_language && (
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider">Language</p>
                    <p className="text-white/80 font-medium uppercase">{moviedetail.original_language}</p>
                  </div>
                )}
                {moviedetail.production_companies?.length > 0 && (
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider">Production</p>
                    <p className="text-white/80 font-medium truncate">
                      {moviedetail.production_companies[0]?.name}
                    </p>
                  </div>
                )}
              </div>

              {/* View Cast Button */}
              <button
                onClick={() => setShowActors(!showActors)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#01b4e4] hover:bg-[#0291c9] text-white rounded-full font-semibold transition-all"
              >
                <FaUsers />
                {showActors ? 'Hide Cast & Crew' : 'View Cast & Crew'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actors Section */}
      {showActors && (
        <div className="border-t border-white/5 mt-8">
          <Actors />
        </div>
      )}
    </div>
  );
};

export default MovieDetail;