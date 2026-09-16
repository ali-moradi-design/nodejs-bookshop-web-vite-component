import { apiGet } from '@/services/http';
import type { ApiData } from '@/services/http';
import type {
  OrdersByStatusItem,
  RevenueSummary,
  SalesByDateItem,
  TopBookItem,
} from '@/types/analytics';

export const analyticsKeys = {
  all: ['analytics'] as const,
  revenue: (from?: string, to?: string) => [...analyticsKeys.all, 'revenue', from, to] as const,
  ordersByStatus: () => [...analyticsKeys.all, 'orders-by-status'] as const,
  topBooks: (from?: string, to?: string) => [...analyticsKeys.all, 'top-books', from, to] as const,
  salesByDate: (from?: string, to?: string) =>
    [...analyticsKeys.all, 'sales-by-date', from, to] as const,
};

export const fetchRevenue = (from?: string, to?: string) =>
  apiGet<ApiData<RevenueSummary>>('/reports/analytics/revenue', { from, to });

export const fetchOrdersByStatus = () =>
  apiGet<ApiData<OrdersByStatusItem[]>>('/reports/analytics/orders-by-status');

export const fetchTopBooks = (from?: string, to?: string) =>
  apiGet<ApiData<TopBookItem[]>>('/reports/analytics/top-books', { from, to });

export const fetchSalesByDate = (from?: string, to?: string) =>
  apiGet<ApiData<SalesByDateItem[]>>('/reports/analytics/sales-by-date', { from, to });
