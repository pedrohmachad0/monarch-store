import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CartItem } from '../types/cart';
import type { Product } from '../types/product';

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const value = useMemo<CartContextValue>(() => ({
    items,
    addItem: (product, size, color, quantity = 1) => setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id && item.size === size && item.color === color);
      if (!existing) return [...current, { product, quantity, size, color }];
      return current.map((item) => item === existing ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) } : item);
    }),
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
