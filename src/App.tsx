import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { StoreLayout } from './layouts/StoreLayout';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return <AuthProvider><CartProvider><FavoritesProvider><StoreLayout><AppRoutes /></StoreLayout></FavoritesProvider></CartProvider></AuthProvider>;
}
