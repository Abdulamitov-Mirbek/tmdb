// Actors.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaStar, FaUser } from "react-icons/fa";

const Actors = () => {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieTitle, setMovieTitle] = useState("");
  const [activeTab, setActiveTab] = useState("cast");

  const { movieId } = useParams();
  const API_KEY = "45d1d56fc54beedb6c0207f9ac6cab7c";

  async function getActors() {
    try {
      setLoading(true);

      // Fetch credits and movie details in parallel
      const [creditsRes, movieRes] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
        ),
      ]);

      setCast(creditsRes.data.cast || []);
      setCrew(creditsRes.data.crew || []);
      setMovieTitle(movieRes.data.title || "");
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch cast information");
      setLoading(false);
      console.error("Error:", err);
    }
  }

  useEffect(() => {
    getActors();
    window.scrollTo(0, 0);
  }, [movieId]);

  // Get unique departments for crew
  const departments = [
    ...new Set(
      crew.map(
        (person) => person.department || person.known_for_department || "Other",
      ),
    ),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#032541] pt-[100px]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="w-12 h-12 border-4 border-white/10 border-t-[#01b4e4] rounded-full animate-spin"></div>
            <p className="text-white/60">Loading cast & crew...</p>
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
              onClick={getActors}
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
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={`/movie/${movieId}`}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft className="text-sm" />
            <span className="text-sm">Back to {movieTitle}</span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Cast & Crew
          </h1>
          {movieTitle && <p className="text-white/50 mt-2">{movieTitle}</p>}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab("cast")}
            className={`px-6 py-3 text-sm font-medium transition-all relative ${
              activeTab === "cast"
                ? "text-white"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Cast ({cast.length})
            {activeTab === "cast" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#01b4e4] rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("crew")}
            className={`px-6 py-3 text-sm font-medium transition-all relative ${
              activeTab === "crew"
                ? "text-white"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Crew ({crew.length})
            {activeTab === "crew" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#01b4e4] rounded-full"></div>
            )}
          </button>
        </div>

        {/* Cast Grid */}
        {activeTab === "cast" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {cast.map((actor) => (
              <div
                key={actor.cast_id || actor.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden hover:border-[#01b4e4]/30 transition-all duration-300 group"
              >
                {/* Actor Photo */}
                <div className="relative aspect-[2/3] overflow-hidden bg-[#0a1526]">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w342/${actor.profile_path}`
                        : "https://via.placeholder.com/342x513/1a1a2e/ffffff?text=No+Photo"
                    }
                    alt={actor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#032541] via-[#032541]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="text-white text-xs line-clamp-2">
                      {actor.character || "Unknown Role"}
                    </p>
                  </div>
                </div>

                {/* Actor Info */}
                <div className="p-3">
                  <h3 className="text-white text-sm font-semibold truncate">
                    {actor.name}
                  </h3>
                  <p className="text-white/40 text-xs mt-1 truncate">
                    {actor.character || "Unknown Role"}
                  </p>
                  {actor.popularity > 0 && (
                    <div className="flex items-center gap-1 mt-2 text-[#FFD700] text-xs">
                      <FaStar className="text-[10px]" />
                      <span>{actor.popularity?.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {cast.length === 0 && (
              <div className="col-span-full text-center py-12">
                <FaUser className="text-white/10 text-5xl mx-auto mb-4" />
                <p className="text-white/40">No cast information available</p>
              </div>
            )}
          </div>
        )}

        {/* Crew Grid */}
        {activeTab === "crew" && (
          <div className="space-y-8">
            {departments.map((department) => {
              const departmentMembers = crew.filter(
                (person) =>
                  (person.department ||
                    person.known_for_department ||
                    "Other") === department,
              );

              if (departmentMembers.length === 0) return null;

              return (
                <div key={department}>
                  <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-[#01b4e4] rounded-full inline-block"></span>
                    {department}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                    {departmentMembers.map((person) => (
                      <div
                        key={`${person.id}-${person.job}`}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden hover:border-[#01b4e4]/30 transition-all duration-300 group"
                      >
                        <div className="relative aspect-[2/3] overflow-hidden bg-[#0a1526]">
                          <img
                            src={
                              person.profile_path
                                ? `https://image.tmdb.org/t/p/w342/${person.profile_path}`
                                : "https://via.placeholder.com/342x513/1a1a2e/ffffff?text=No+Photo"
                            }
                            alt={person.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="text-white text-sm font-semibold truncate">
                            {person.name}
                          </h4>
                          <p className="text-white/40 text-xs mt-1 truncate">
                            {person.job ||
                              person.known_for_department ||
                              "Crew"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {crew.length === 0 && (
              <div className="text-center py-12">
                <FaUser className="text-white/10 text-5xl mx-auto mb-4" />
                <p className="text-white/40">No crew information available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Actors;
