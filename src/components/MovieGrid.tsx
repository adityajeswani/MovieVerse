import { MovieCard } from './MovieCard';
import { Movie } from '@/lib/tmdb';
import { useNavigate } from 'react-router-dom';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  showFavoriteButton?: boolean;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  isLoading = false,
  showFavoriteButton = true 
}) => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted rounded-lg h-64 mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-3 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => handleMovieClick(movie.id)}
          showFavoriteButton={showFavoriteButton}
        />
      ))}
    </div>
  );
};