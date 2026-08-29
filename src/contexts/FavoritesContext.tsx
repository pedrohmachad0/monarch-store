import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface FavoritesContextValue {
  favoriteIds: string[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const stored = window.localStorage.getItem('monarch-favorites');
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (productId: string) => {
    setFavoriteIds((current) => {
      const next = current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId];
      window.localStorage.setItem('monarch-favorites', JSON.stringify(next));
      return next;
    });
  };

  const value = useMemo(() => ({ favoriteIds, isFavorite: (productId: string) => favoriteIds.includes(productId), toggleFavorite }), [favoriteIds]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider');
  return context;
}
