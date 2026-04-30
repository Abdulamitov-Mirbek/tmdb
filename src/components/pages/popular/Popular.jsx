// Popular.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaInfoCircle, FaStar, FaCalendar, FaLanguage } from "react-icons/fa";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  async function getPopular() {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=45d1d56fc54beedb6c0207f9ac6cab7c&language=en-US&page=1`
      );
      setPopular(response.data.results || []);
      setLoading(false);
    } catch (err) {
      setError("Unable to load popular films. Please check your connection.");
      setLoading(false);
    }
  }

  useEffect(() => {
    getPopular();
  }, []);

  const getRatingColor = (rating) => {
    if (rating >= 8) return "bg-green-500";
    if (rating >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#032541] pt-[100px] pb-12">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="w-12 h-12 border-4 border-white/10 border-t-[#01b4e4] rounded-full animate-spin"></div>
            <p className="text-white/60">Curating popular films for you...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-[#032541] pt-[100px] pb-12">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center gap-4">
            <div className="text-6xl text-red-500 font-bold">!</div>
            <h2 className="text-red-500 text-xl font-semibold">Service Interruption</h2>
            <p className="text-white/70">{error}</p>
            <button 
              onClick={getPopular}
              className="mt-4 px-8 py-3 bg-[#01b4e4] hover:bg-[#0291c9] text-white rounded-full font-semibold transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#032541] pt-[100px] pb-12">
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              🔥 Popular Now
              <span className="w-16 h-1 bg-gradient-to-r from-[#01b4e4] to-[#90cea1] rounded-full inline-block"></span>
            </h1>
            <p className="text-white/60 mt-2">The most watched films worldwide, updated daily</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2">
            <span className="text-[#01b4e4] font-bold text-xl">{popular.length}</span>
            <span className="text-white/60 ml-2">Films</span>
          </div>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {popular.map((movie, index) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#01b4e4]/50 hover:-translate-y-2 transition-all duration-300"
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              {/* Rank */}
              <div className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur-sm text-[#01b4e4] font-bold px-3 py-1 rounded-full text-sm border border-[#01b4e4]/30">
                #{index + 1}
              </div>

              {/* Poster */}
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : "https://via.placeholder.com/500x750/1a1a2e/ffffff?text=No+Poster"
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Rating Badge */}
                <div className={`absolute top-3 right-3 ${getRatingColor(movie.vote_average)} text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
                  <FaStar className="text-yellow-300" />
                  {movie.vote_average?.toFixed(1)}
                </div>

                {/* Hover Overlay */}
                {hoveredMovie === movie.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#032541]/95 to-black/40 flex items-center justify-center">
                    <div className="flex flex-col gap-2">
                      <button className="px-6 py-2 bg-[#01b4e4] hover:bg-[#0291c9] text-white rounded-full font-semibold text-sm flex items-center gap-2 transition-all">
                        <FaPlay /> Trailer
                      </button>
                      <button className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold text-sm flex items-center gap-2 border border-white/30 transition-all">
                        <FaInfoCircle /> Details
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Movie Info */}
              <div className="p-3">
                <h2 className="text-white font-semibold text-sm truncate mb-2">{movie.title}</h2>
                <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
                  <span className="flex items-center gap-1">
                    <FaCalendar />
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : "TBA"}
                  </span>
                  <span className="text-[#01b4e4]">•</span>
                  <span className="flex items-center gap-1">
                    <FaLanguage />
                    {movie.original_language?.toUpperCase() || "N/A"}
                  </span>
                </div>
                {/* Rating Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#01b4e4] to-[#90cea1] rounded-full"
                      style={{ width: `${((movie.vote_average || 0) / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white/70 text-xs font-medium">
                    {movie.vote_average?.toFixed(1) || "N/A"}
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