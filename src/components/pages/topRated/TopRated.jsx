// TopRated.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaCalendar, FaArrowUp, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";

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
        setMovies(response.data.results || []);
        setTotalPages(response.data.total_pages || 0);
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
    if (rating >= 8) return "bg-green-500";
    if (rating >= 7) return "bg-green-400";
    if (rating >= 6) return "bg-yellow-500";
    if (rating >= 5) return "bg-orange-500";
    return "bg-red-500";
  };

  const getRatingBadge = (rating) => {
    if (rating >= 8.5) return "🏆 Masterpiece";
    if (rating >= 8) return "⭐ Excellent";
    if (rating >= 7) return "👍 Great";
    if (rating >= 6) return "👌 Good";
    if (rating >= 5) return "😐 Average";
    return "👎 Poor";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#032541] pt-[100px]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="w-12 h-12 border-4 border-white/10 border-t-[#01b4e4] rounded-full animate-spin"></div>
            <p className="text-white/60">Loading top rated movies...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#032541] pt-[100px]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center gap-4">
            <span className="text-6xl">⚠️</span>
            <h2 className="text-red-400 text-xl font-semibold">
              Oops! Something went wrong
            </h2>
            <p className="text-white/60">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-8 py-3 bg-[#01b4e4] hover:bg-[#0291c9] text-white rounded-full font-semibold transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#032541] pt-[100px] pb-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#01b4e4]/5 to-[#90cea1]/5 border-b border-white/5 py-12 mb-8">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3 mb-3">
            <span>⭐</span>
            Top Rated Movies
            <span className="w-16 h-1 bg-gradient-to-r from-[#01b4e4] to-[#90cea1] rounded-full inline-block"></span>
          </h1>
          <p className="text-white/50 text-sm">
            Discover the highest rated movies of all time
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="text-white/60 text-sm">
            Page <span className="text-white font-semibold">{currentPage}</span>{" "}
            of <span className="text-white font-semibold">{totalPages}</span>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5">
            <FaFilter className="text-[#01b4e4] text-sm" />
            <select
              className="bg-transparent text-white text-sm outline-none cursor-pointer"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="vote_average" className="bg-[#032541]">
                Sort by Rating
              </option>
              <option value="title" className="bg-[#032541]">
                Sort by Title
              </option>
              <option value="release_date" className="bg-[#032541]">
                Sort by Release Date
              </option>
              <option value="popularity" className="bg-[#032541]">
                Sort by Popularity
              </option>
            </select>
          </div>
        </div>

        {/* Movie Grid - Same as Popular page */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {movies.map((movie, index) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="group relative bg-white/[0.03] rounded-xl overflow-hidden border border-white/[0.06] hover:border-[#01b4e4]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
            >
              {/* Rank Number */}
              <div className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur-sm text-[#FFD700] font-bold px-2.5 py-0.5 rounded-full text-xs border border-[#FFD700]/30">
                #{(currentPage - 1) * 20 + index + 1}
              </div>

              {/* Poster */}
              <div className="relative aspect-[2/3] overflow-hidden bg-[#0a1526]">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
                      : "https://via.placeholder.com/342x513/1a1a2e/ffffff?text=No+Poster"
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Rating Badge */}
                <div
                  className={`absolute top-2 right-2 flex items-center gap-1 ${getRatingColor(movie.vote_average)} px-2 py-1 rounded-full`}
                >
                  <FaStar className="text-white text-[10px]" />
                  <span className="text-white text-xs font-semibold">
                    {movie.vote_average?.toFixed(1)}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#032541] via-[#032541]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-3">
                  <span className="text-[#FFD700] text-2xl font-bold mb-1">
                    {movie.vote_average?.toFixed(1)}
                  </span>
                  <span className="text-white/70 text-xs">
                    {getRatingBadge(movie.vote_average)}
                  </span>
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-3">
                <h3 className="text-white text-sm font-semibold truncate mb-2">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-1 text-white/40 text-xs mb-2">
                  <FaCalendar className="text-[10px]" />
                  <span>
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "TBA"}
                  </span>
                </div>
                {/* Rating Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        movie.vote_average >= 8
                          ? "bg-green-500"
                          : movie.vote_average >= 6
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{
                        width: `${((movie.vote_average || 0) / 10) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-white/50 text-xs">
                    {movie.vote_average?.toFixed(1)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-12">
          <button
            className="px-5 py-2.5 bg-white/[0.03] border border-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <div className="flex items-center gap-2">
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
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                    currentPage === pageNum
                      ? "bg-[#01b4e4] text-white"
                      : "bg-white/[0.03] border border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="text-white/40 px-2">...</span>
                <button
                  className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/10 text-white/70 hover:bg-white/10 text-sm font-medium transition-all"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            className="px-5 py-2.5 bg-white/[0.03] border border-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#01b4e4] hover:bg-[#0291c9] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#01b4e4]/20 transition-all z-50 animate-bounce"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default TopRated;
