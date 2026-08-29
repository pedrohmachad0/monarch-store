import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CartItem } from '../types/cart';
import type { Product } from '../types/product';

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, size?: string, color?: string, quantity?: number) => void;
  updateItemQuantity: (productId: string, size: string | undefined, color: string | undefined, quantity: number) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const value = useMemo<CartContextValue>(() => ({
    items,
    addItem: (product, size, color, quantity = 1) => setItems((current) => {
      if (product.stock < 1) return current;
      const safeQuantity = Math.max(1, Math.min(quantity, product.stock));
      const existing = current.find((item) => item.product.id === product.id && item.size === size && item.color === color);
      if (!existing) return [...current, { product, quantity: safeQuantity, size, color }];
      return current.map((item) => item === existing ? { ...item, quantity: Math.min(item.quantity + safeQuantity, product.stock) } : item);
    }),
    updateItemQuantity: (productId, size, color, quantity) => setItems((current) => current.map((item) => {
      if (item.product.id !== productId || item.size !== size || item.color !== color) return item;
      return { ...item, quantity: Math.max(1, Math.min(quantity, item.product.stock)) };
    })),
    removeItem: (productId, size, color) => setItems((current) => current.filter((item) => !(item.product.id === productId && (size === undefined || item.size === size) && (color === undefined || item.color === color)))),
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
