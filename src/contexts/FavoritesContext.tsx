import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface FavoritesContextValue {
  favoriteIds: string[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const GUEST_FAVORITES_KEY = 'monarch-favorites';
const ACCOUNT_FAVORITES_PREFIX = 'monarch-favorites:user:';

function accountFavoritesKey(userId: string) {
  return `${ACCOUNT_FAVORITES_PREFIX}${encodeURIComponent(userId)}`;
}

function readFavoriteIds(storageKey: string) {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as unknown;
    return Array.isArray(parsed) && parsed.every((id): id is string => typeof id === 'string') ? [...new Set(parsed)] : [];
  } catch {
    return [];
  }
}

function writeFavoriteIds(storageKey: string, favoriteIds: string[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(favoriteIds));
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const activeUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const nextUserId = user?.id ?? null;
    const nextStorageKey = nextUserId ? accountFavoritesKey(nextUserId) : GUEST_FAVORITES_KEY;

    if (nextUserId) {
      const accountFavoriteIds = readFavoriteIds(nextStorageKey);
      const guestFavoriteIds = readFavoriteIds(GUEST_FAVORITES_KEY);
      const mergedFavoriteIds = [...new Set([...accountFavoriteIds, ...guestFavoriteIds])];
      writeFavoriteIds(nextStorageKey, mergedFavoriteIds);
      window.localStorage.removeItem(GUEST_FAVORITES_KEY);
      setFavoriteIds(mergedFavoriteIds);
    } else {
      setFavoriteIds(readFavoriteIds(nextStorageKey));
    }

    activeUserIdRef.current = nextUserId;
  }, [user?.id]);

  const toggleFavorite = useCallback((productId: string) => {
    const storageKey = activeUserIdRef.current ? accountFavoritesKey(activeUserIdRef.current) : GUEST_FAVORITES_KEY;
    setFavoriteIds((current) => {
      const next = current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId];
      writeFavoriteIds(storageKey, next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({
    favoriteIds,
    isFavorite: (productId: string) => favoriteIds.includes(productId),
    toggleFavorite,
  }), [favoriteIds, toggleFavorite]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider');
  return context;
}
