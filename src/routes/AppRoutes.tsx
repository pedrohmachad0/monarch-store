import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { CatalogPage } from '../pages/CatalogPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import { FavoritesPage } from '../pages/FavoritesPage';

export function AppRoutes() {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/catalogo" element={<CatalogPage />} />
    <Route path="/categoria/:category" element={<CatalogPage />} />
    <Route path="/produto/:slug" element={<ProductPage />} />
    <Route path="/carrinho" element={<CartPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/conta" element={<AccountPage />} />
    <Route path="/favoritos" element={<FavoritesPage />} />
  </Routes>;
}
