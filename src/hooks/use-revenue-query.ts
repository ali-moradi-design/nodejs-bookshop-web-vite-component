import { useQuery } from '@tanstack/react-query';
import { analyticsKeys, fetchRevenue } from '@/services/admin';

export function useRevenueQuery(from?: string, to?: string) {
  return useQuery({
    queryKey: analyticsKeys.revenue(from, to),
    queryFn: async () => (await fetchRevenue(from, to)).data,
  });
}
