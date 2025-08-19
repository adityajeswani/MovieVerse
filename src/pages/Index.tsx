import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to dashboard if user is already logged in
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const features = [
    {
      icon: Star,
      title: "Discover Movies",
      description: "Explore trending, popular, and top-rated movies from around the world"
    },
    {
      icon: Users,
      title: "Personal Favorites",
      description: "Create your own collection of favorite movies and access them anytime"
    },
    {
      icon: TrendingUp,
      title: "Real-time Data",
      description: "Get the latest movie information powered by The Movie Database"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-primary/10 rounded-full animate-glow">
              <Film className="h-16 w-16 text-primary" />
            </div>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold gradient-text leading-tight">
            Movie Verse
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover, explore, and organize your favorite movies with our comprehensive movie database
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              onClick={() => navigate('/register')}
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-4 h-auto"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/login')}
              className="text-lg px-8 py-4 h-auto border-primary/30 hover:bg-primary/10"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Why Choose Movie Verse?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the ultimate movie discovery platform with powerful features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="bg-gradient-card border-border/50 shadow-card hover:shadow-elegant transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Ready to Start Exploring?
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of movie enthusiasts and start building your perfect movie collection today
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/register')}
            className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-4 h-auto animate-glow"
          >
            Create Your Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
