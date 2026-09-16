import { apiDelete, apiGet, apiPatch, apiPost } from '@/services/http';
import type { ApiData, ApiMessage } from '@/services/http';
import type { CreateDiscountInput, Discount, UpdateDiscountInput } from '@/types/discount';

export const discountKeys = {
  all: ['discounts'] as const,
  list: () => [...discountKeys.all, 'list'] as const,
};

export const fetchDiscounts = () => apiGet<ApiData<Discount[]>>('/discounts');

export const createDiscount = (input: CreateDiscountInput) =>
  apiPost<ApiData<Discount>>('/discounts', input);

export const updateDiscount = (id: string, input: UpdateDiscountInput) =>
  apiPatch<ApiData<Discount>>(`/discounts/${id}`, input);

export const deleteDiscount = (id: string) => apiDelete<ApiMessage>(`/discounts/${id}`);
