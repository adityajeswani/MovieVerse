import { Star, Heart, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Movie, getImageUrl } from '@/lib/tmdb';
import { favoritesService } from '@/lib/favorites';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
  showFavoriteButton?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  onClick, 
  showFavoriteButton = true 
}) => {
  const [isFavorite, setIsFavorite] = useState(favoritesService.isFavorite(movie.id));
  const { toast } = useToast();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isFavorite) {
      favoritesService.removeFromFavorites(movie.id);
      setIsFavorite(false);
      toast({
        title: "Removed from favorites",
        description: `${movie.title} has been removed from your favorites.`,
      });
    } else {
      favoritesService.addToFavorites(movie);
      setIsFavorite(true);
      toast({
        title: "Added to favorites",
        description: `${movie.title} has been added to your favorites.`,
      });
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).getFullYear();
  };

  return (
    <Card 
      className="group movie-card-hover cursor-pointer bg-gradient-card border-border/50 overflow-hidden shadow-card"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {showFavoriteButton && (
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 p-0 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
            />
          </Button>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
            </div>
            {movie.popularity > 100 && (
              <Badge variant="secondary" className="text-xs bg-accent/20 text-accent border-accent/30">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(movie.release_date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {movie.overview}
        </p>
      </CardContent>
    </Card>
  );
};