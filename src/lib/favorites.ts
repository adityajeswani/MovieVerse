import { Movie } from './tmdb';

const FAVORITES_KEY = 'movieapp_favorites';

export const favoritesService = {
  getFavorites(): Movie[] {
    const favoritesStr = localStorage.getItem(FAVORITES_KEY);
    return favoritesStr ? JSON.parse(favoritesStr) : [];
  },

  addToFavorites(movie: Movie): void {
    const favorites = this.getFavorites();
    const isAlreadyFavorite = favorites.some(fav => fav.id === movie.id);
    
    if (!isAlreadyFavorite) {
      favorites.push(movie);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  },

  removeFromFavorites(movieId: number): void {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.id !== movieId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  },

  isFavorite(movieId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.id === movieId);
  }
};