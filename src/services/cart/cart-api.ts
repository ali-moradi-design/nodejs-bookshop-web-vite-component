import { apiDelete, apiGet, apiPatch, apiPost } from '@/services/http';
import type { ApiData } from '@/services/http';
import type { Order } from '@/types/order';
import type { Cart, CheckoutInput } from '@/types/cart';

export const cartKeys = {
  all: ['cart'] as const,
  current: () => [...cartKeys.all, 'current'] as const,
};

export const fetchCart = () => apiGet<ApiData<Cart>>('/cart');

export const addCartItem = (bookId: string, quantity: number) =>
  apiPost<ApiData<Cart>>('/cart/items', { bookId, quantity });

export const updateCartItem = (bookId: string, quantity: number) =>
  apiPatch<ApiData<Cart>>(`/cart/items/${bookId}`, { quantity });

export const removeCartItem = (bookId: string) => apiDelete<ApiData<Cart>>(`/cart/items/${bookId}`);

export const clearCart = () => apiDelete<ApiData<Cart>>('/cart');

export const checkoutCart = (input: CheckoutInput) =>
  apiPost<ApiData<Order>>('/cart/checkout', input);
