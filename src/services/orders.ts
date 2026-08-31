import type { Order, OrderAddress, OrderItem, OrderStatus } from '../types/order';

const ORDERS_PREFIX = 'monarch-orders:';

function ordersKey(userId: string) {
  return `${ORDERS_PREFIX}${encodeURIComponent(userId)}`;
}

function readOrders(userId: string): Order[] {
  try {
    const stored = window.localStorage.getItem(ordersKey(userId));
    if (!stored) return [];
    const parsed = JSON.parse(stored) as unknown;
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

function writeOrders(userId: string, orders: Order[]) {
  window.localStorage.setItem(ordersKey(userId), JSON.stringify(orders));
}

export function listOrders(userId: string) {
  return readOrders(userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getOrder(userId: string, orderId: string) {
  return readOrders(userId).find((order) => order.id === orderId) ?? null;
}

export function listAllLocalOrders() {
  const orders: Order[] = [];
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (!key?.startsWith(ORDERS_PREFIX)) continue;
    const userOrders = readOrders(decodeURIComponent(key.slice(ORDERS_PREFIX.length)));
    orders.push(...userOrders);
  }
  return orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function createOrder({ userId, items, subtotal, address, shipping = 0 }: { userId: string; items: OrderItem[]; subtotal: number; address: OrderAddress; shipping?: number }) {
  const now = new Date();
  const order: Order = {
    id: `order-${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
    number: `MON-${now.getFullYear()}-${String(now.getTime()).slice(-6)}`,
    userId,
    createdAt: now.toISOString(),
    status: 'received' satisfies OrderStatus,
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
    address: { ...address },
  };
  const orders = readOrders(userId);
  writeOrders(userId, [order, ...orders]);
  return order;
}
