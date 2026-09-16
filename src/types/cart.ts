import type { ShippingAddress } from '@/types/order';

export type { ShippingAddress };

export interface CartItem {
  bookId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  updatedAt: string;
  createdAt: string;
}

export interface CheckoutInput {
  shippingAddress: ShippingAddress;
  discountCode?: string;
}
