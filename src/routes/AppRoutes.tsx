import { Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import { HomePage } from '../pages/HomePage';
import { CatalogPage } from '../pages/CatalogPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { AccountPage } from '../pages/AccountPage';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { FavoritesPage } from '../pages/FavoritesPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { OrdersPage } from '../pages/OrdersPage';
import { OrderDetailPage } from '../pages/OrderDetailPage';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

function ProtectedAccount() {
  return <ProtectedRoute><AccountPage /></ProtectedRoute>;
}

function ProtectedOrders() {
  return <ProtectedRoute><OrdersPage /></ProtectedRoute>;
}

function ProtectedOrderDetail() {
  return <ProtectedRoute><OrderDetailPage /></ProtectedRoute>;
}

export function AppRoutes() {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/catalogo" element={<CatalogPage />} />
    <Route path="/categoria/:category" element={<CatalogPage />} />
    <Route path="/produto/:slug" element={<ProductPage />} />
    <Route path="/carrinho" element={<CartPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/cadastro" element={<RegisterPage />} />
    <Route path="/minha-conta" element={<ProtectedAccount />} />
    <Route path="/conta" element={<ProtectedAccount />} />
    <Route path="/favoritos" element={<FavoritesPage />} />
    <Route path="/pedido-confirmado" element={<OrderConfirmationPage />} />
    <Route path="/pedidos" element={<ProtectedOrders />} />
    <Route path="/pedidos/:id" element={<ProtectedOrderDetail />} />
  </Routes>;
}
