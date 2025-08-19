import { useState, useEffect } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieGrid } from '@/components/MovieGrid';
import { Layout } from '@/components/Layout';
import { favoritesService } from '@/lib/favorites';
import { Movie } from '@/lib/tmdb';
import { useToast } from '@/hooks/use-toast';

export const Favorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setFavorites(favoritesService.getFavorites());
  }, []);

  const handleClearAll = () => {
    favorites.forEach(movie => {
      favoritesService.removeFromFavorites(movie.id);
    });
    setFavorites([]);
    toast({
      title: "Favorites cleared",
      description: "All movies have been removed from your favorites.",
    });
  };

  const refreshFavorites = () => {
    setFavorites(favoritesService.getFavorites());
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="font-display text-4xl font-bold gradient-text mb-2">
              My Favorites
            </h1>
            <p className="text-muted-foreground">
              Your personally curated collection of amazing movies
            </p>
          </div>
          
          {favorites.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Content */}
        {favorites.length === 0 ? (
          <div className="text-center py-16 animate-slide-up">
            <div className="max-w-md mx-auto space-y-4">
              <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold">No favorites yet</h2>
              <p className="text-muted-foreground">
                Start exploring movies and add them to your favorites to see them here.
              </p>
              <Button 
                onClick={() => window.location.href = '/dashboard'}
                className="bg-gradient-primary hover:opacity-90"
              >
                Discover Movies
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              <span>{favorites.length} movie{favorites.length !== 1 ? 's' : ''} in your favorites</span>
            </div>
            
            <div className="animate-slide-up">
              <MovieGrid 
                movies={favorites} 
                showFavoriteButton={true}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};