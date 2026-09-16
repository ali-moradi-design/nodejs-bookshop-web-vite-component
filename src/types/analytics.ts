export interface RevenueSummary {
  totalRevenue?: number;
  orderCount?: number;
  [key: string]: unknown;
}

export interface OrdersByStatusItem {
  status: string;
  count: number;
}

export interface TopBookItem {
  bookId?: string;
  title?: string;
  quantity?: number;
  revenue?: number;
  [key: string]: unknown;
}

export interface SalesByDateItem {
  date: string;
  revenue?: number;
  orders?: number;
  [key: string]: unknown;
}
