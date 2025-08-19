import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Clock, Heart, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { movieApi, MovieDetails, getImageUrl, getBackdropUrl } from '@/lib/tmdb';
import { favoritesService } from '@/lib/favorites';
import { useToast } from '@/hooks/use-toast';

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response = await movieApi.getMovieDetails(parseInt(id));
        setMovie(response.data);
        setIsFavorite(favoritesService.isFavorite(response.data.id));
      } catch (error) {
        toast({
          title: "Error fetching movie details",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, toast]);

  const handleFavoriteToggle = () => {
    if (!movie) return;

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

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-8">
          <div className="h-64 md:h-96 bg-muted rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!movie) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Movie not found.</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            Go back to dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden shadow-elegant animate-fade-in">
          <div className="absolute inset-0">
            <img
              src={getBackdropUrl(movie.backdrop_path)}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </div>
          
          <div className="relative z-10 p-8 md:p-12 min-h-[400px] flex items-end">
            <div className="flex flex-col md:flex-row gap-8 w-full">
              <div className="flex-shrink-0">
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-2xl"
                />
              </div>
              
              <div className="flex-1 text-white space-y-4">
                <div className="space-y-2">
                  <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                    {movie.title}
                  </h1>
                  {movie.tagline && (
                    <p className="text-xl text-gray-300 italic">"{movie.tagline}"</p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-gray-300">({movie.vote_count} votes)</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <Badge key={genre.id} variant="secondary" className="bg-white/20 text-white border-white/30">
                      {genre.name}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    onClick={handleFavoriteToggle}
                    variant={isFavorite ? "default" : "outline"}
                    className={isFavorite ? "bg-red-600 hover:bg-red-700" : "bg-white/10 border-white/30 text-white hover:bg-white/20"}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {movie.production_companies.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Production Companies</h3>
                <div className="flex flex-wrap gap-4">
                  {movie.production_companies.map((company) => (
                    <div key={company.id} className="flex items-center gap-2 p-3 bg-card rounded-lg border">
                      {company.logo_path && (
                        <img
                          src={getImageUrl(company.logo_path, 'w200')}
                          alt={company.name}
                          className="h-8 w-auto object-contain"
                        />
                      )}
                      <span className="text-sm font-medium">{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Movie Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">{movie.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Original Language:</span>
                  <span className="font-medium uppercase">{movie.original_language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Runtime:</span>
                  <span className="font-medium">{formatRuntime(movie.runtime)}</span>
                </div>
                {movie.budget > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-medium">{formatCurrency(movie.budget)}</span>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="font-medium">{formatCurrency(movie.revenue)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};