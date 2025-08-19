import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, Star, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MovieGrid } from '@/components/MovieGrid';
import { SearchBar } from '@/components/SearchBar';
import { Layout } from '@/components/Layout';
import { movieApi, Movie } from '@/lib/tmdb';
import { useToast } from '@/hooks/use-toast';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { toast } = useToast();

  const fetchMovies = useCallback(async (category: string, pageNum: number = 1, append: boolean = false) => {
    try {
      setIsLoading(true);
      let response;
      
      switch (category) {
        case 'popular':
          response = await movieApi.getPopular(pageNum);
          break;
        case 'top-rated':
          response = await movieApi.getTopRated(pageNum);
          break;
        case 'now-playing':
          response = await movieApi.getNowPlaying(pageNum);
          break;
        case 'upcoming':
          response = await movieApi.getUpcoming(pageNum);
          break;
        case 'trending':
          response = await movieApi.getTrending(pageNum);
          break;
        default:
          response = await movieApi.getPopular(pageNum);
      }

      const newMovies = response.data.results;
      
      if (append) {
        setMovies(prev => [...prev, ...newMovies]);
      } else {
        setMovies(newMovies);
      }
      
      setHasMore(pageNum < response.data.total_pages);
    } catch (error) {
      toast({
        title: "Error fetching movies",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const searchMovies = useCallback(async (query: string, pageNum: number = 1, append: boolean = false) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchQuery('');
      return;
    }

    try {
      setIsLoading(true);
      const response = await movieApi.searchMovies(query, pageNum);
      const newMovies = response.data.results;
      
      if (append) {
        setSearchResults(prev => [...prev, ...newMovies]);
      } else {
        setSearchResults(newMovies);
      }
      
      setSearchQuery(query);
      setHasMore(pageNum < response.data.total_pages);
    } catch (error) {
      toast({
        title: "Error searching movies",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    setPage(1);
    fetchMovies(activeTab);
  }, [activeTab, fetchMovies]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchQuery('');
    setSearchResults([]);
    setPage(1);
  };

  const handleSearch = (query: string) => {
    setPage(1);
    searchMovies(query);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    
    if (searchQuery) {
      searchMovies(searchQuery, nextPage, true);
    } else {
      fetchMovies(activeTab, nextPage, true);
    }
  };

  const displayMovies = searchQuery ? searchResults : movies;
  const isSearchMode = !!searchQuery;

  const tabConfig = [
    { value: 'popular', label: 'Popular', icon: TrendingUp },
    { value: 'top-rated', label: 'Top Rated', icon: Star },
    { value: 'now-playing', label: 'Now Playing', icon: Calendar },
    { value: 'upcoming', label: 'Upcoming', icon: Clock },
    { value: 'trending', label: 'Trending', icon: TrendingUp },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold gradient-text">
            Discover Amazing Movies
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the latest blockbusters, timeless classics, and hidden gems
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto animate-slide-up">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for movies, actors, directors..."
            className="w-full"
          />
        </div>

        {/* Content */}
        {isSearchMode ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                Search Results for "{searchQuery}"
              </h2>
              <Button 
                variant="outline" 
                onClick={() => handleSearch('')}
                className="text-muted-foreground"
              >
                Clear Search
              </Button>
            </div>
            
            <MovieGrid movies={displayMovies} isLoading={isLoading && page === 1} />
            
            {displayMovies.length > 0 && hasMore && (
              <div className="text-center">
                <Button 
                  onClick={handleLoadMore} 
                  disabled={isLoading}
                  variant="outline"
                  size="lg"
                >
                  {isLoading ? 'Loading...' : 'Load More'}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-card border border-border">
              {tabConfig.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger 
                    key={tab.value} 
                    value={tab.value}
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {tabConfig.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="space-y-6">
                <MovieGrid movies={displayMovies} isLoading={isLoading && page === 1} />
                
                {displayMovies.length > 0 && hasMore && (
                  <div className="text-center">
                    <Button 
                      onClick={handleLoadMore} 
                      disabled={isLoading}
                      variant="outline"
                      size="lg"
                      className="animate-glow"
                    >
                      {isLoading ? 'Loading...' : 'Load More Movies'}
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </Layout>
  );
};