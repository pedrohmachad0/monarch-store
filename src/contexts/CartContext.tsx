import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CartItem } from '../types/cart';
import type { Product } from '../types/product';

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, size?: string, color?: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const value = useMemo<CartContextValue>(() => ({
    items,
    addItem: (product, size, color) => setItems((current) => [...current, { product, quantity: 1, size, color }]),
    removeItem: (productId) => setItems((current) => current.filter((item) => item.product.id !== productId)),
    clearCart: () => setItems([]),
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
