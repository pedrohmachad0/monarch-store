import { CartProvider } from './contexts/CartContext';
import { StoreLayout } from './layouts/StoreLayout';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return <CartProvider><StoreLayout><AppRoutes /></StoreLayout></CartProvider>;
}
