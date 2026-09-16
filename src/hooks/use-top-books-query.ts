import { useQuery } from '@tanstack/react-query';
import { analyticsKeys, fetchTopBooks } from '@/services/admin';

export function useTopBooksQuery(from?: string, to?: string) {
  return useQuery({
    queryKey: analyticsKeys.topBooks(from, to),
    queryFn: async () => (await fetchTopBooks(from, to)).data,
  });
}
