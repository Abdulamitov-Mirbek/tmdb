// Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaCalendar, FaPlay, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const API_KEY = "45d1d56fc54beedb6c0207f9ac6cab7c";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popularRes, topRatedRes, trendingRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
          ),
          axios.get(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
          ),
        ]);

        setPopularMovies(popularRes.data.results.slice(0, 12));
        setTopRatedMovies(topRatedRes.data.results.slice(0, 12));
        setTrendingMovies(trendingRes.data.results.slice(0, 12));
        setHeroMovie(
          popularRes.data.results[
            Math.floor(Math.random() * popularRes.data.results.length)
          ],
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#032541] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/10 border-t-[#01b4e4] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#032541]">
      {/* Hero Section */}
      {heroMovie && (
        <div className="relative min-h-[80vh] flex items-center pt-[70px]">
          <img
            src={`${IMAGE_BASE_URL}/original${heroMovie.backdrop_path}`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#032541] via-[#032541]/80 to-transparent"></div>

          <div className="relative max-w-[1400px] mx-auto px-6 w-full">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {heroMovie.title}
              </h1>
              <div className="flex items-center gap-4 text-white/70 mb-4">
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  {heroMovie.vote_average?.toFixed(1)}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendar />
                  {heroMovie.release_date?.split("-")[0]}
                </span>
              </div>
              <p className="text-white/60 line-clamp-3 mb-6">
                {heroMovie.overview}
              </p>
              <Link
                to={`/movie/${heroMovie.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#01b4e4] hover:bg-[#0291c9] text-white rounded-full font-semibold transition-all"
              >
                <FaPlay /> Watch Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Trending Section */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Trending Now</h2>
              <p className="text-white/50 text-sm mt-1">What's hot this week</p>
            </div>
            <Link
              to="/trending"
              className="flex items-center gap-2 text-[#01b4e4] hover:text-[#90cea1] transition-colors text-sm font-medium"
            >
              View All <FaArrowRight className="text-xs" />
            </Link>
          </div>

          {/* SAME GRID AS POPULAR PAGE */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Section */}
      <section className="py-12 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Popular Movies</h2>
              <p className="text-white/50 text-sm mt-1">
                What everyone is watching
              </p>
            </div>
            <Link
              to="/popular"
              className="flex items-center gap-2 text-[#01b4e4] hover:text-[#90cea1] transition-colors text-sm font-medium"
            >
              View All <FaArrowRight className="text-xs" />
            </Link>
          </div>

          {/* SAME GRID AS POPULAR PAGE */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {popularMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Top Rated</h2>
              <p className="text-white/50 text-sm mt-1">
                Highest rated of all time
              </p>
            </div>
            <Link
              to="/topRated"
              className="flex items-center gap-2 text-[#01b4e4] hover:text-[#90cea1] transition-colors text-sm font-medium"
            >
              View All <FaArrowRight className="text-xs" />
            </Link>
          </div>

          {/* SAME GRID AS POPULAR PAGE */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {topRatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Reusable MovieCard component for Home page
const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative bg-white/[0.03] rounded-xl overflow-hidden border border-white/[0.06] hover:border-[#01b4e4]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
    >
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

        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
          <FaStar className="text-[#FFD700] text-xs" />
          <span className="text-white text-xs font-semibold">
            {movie.vote_average?.toFixed(1)}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#032541] via-[#032541]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <p className="text-white text-xs line-clamp-3">{movie.overview}</p>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-white text-sm font-semibold truncate">
          {movie.title}
        </h3>
        <div className="flex items-center gap-1 text-white/40 text-xs mt-1">
          <FaCalendar className="text-[10px]" />
          <span>
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "TBA"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Home;
