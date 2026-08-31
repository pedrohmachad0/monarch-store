import type { CartItem } from './cart';

export type OrderStatus = 'received' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderAddress {
  name: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image?: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  number: string;
  userId: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  address: OrderAddress;
}

export function cartItemToOrderItem(item: CartItem): OrderItem {
  return {
    productId: item.product.id,
    name: item.product.name,
    image: item.product.images[0],
    price: item.product.price,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
    subtotal: item.product.price * item.quantity,
  };
}
