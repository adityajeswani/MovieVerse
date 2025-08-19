import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getImageUrl = (path: string, size: string = 'w500') => {
  if (!path) return '/placeholder.svg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string, size: string = 'w1280') => {
  if (!path) return '/placeholder.svg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// API Functions
export const movieApi = {
  getPopular: (page: number = 1) => 
    tmdbApi.get<MovieResponse>('/movie/popular', { params: { page } }),
  
  getTopRated: (page: number = 1) => 
    tmdbApi.get<MovieResponse>('/movie/top_rated', { params: { page } }),
  
  getNowPlaying: (page: number = 1) => 
    tmdbApi.get<MovieResponse>('/movie/now_playing', { params: { page } }),
  
  getUpcoming: (page: number = 1) => 
    tmdbApi.get<MovieResponse>('/movie/upcoming', { params: { page } }),
  
  getTrending: (page: number = 1) => 
    tmdbApi.get<MovieResponse>('/trending/movie/week', { params: { page } }),
  
  searchMovies: (query: string, page: number = 1) => 
    tmdbApi.get<MovieResponse>('/search/movie', { params: { query, page } }),
  
  getMovieDetails: (id: number) => 
    tmdbApi.get<MovieDetails>(`/movie/${id}`),
  
  getGenres: () => 
    tmdbApi.get<{ genres: Genre[] }>('/genre/movie/list'),
};