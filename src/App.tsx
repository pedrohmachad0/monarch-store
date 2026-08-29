import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { StoreLayout } from './layouts/StoreLayout';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return <CartProvider><FavoritesProvider><StoreLayout><AppRoutes /></StoreLayout></FavoritesProvider></CartProvider>;
}
