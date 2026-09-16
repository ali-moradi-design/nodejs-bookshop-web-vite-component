import { useQuery } from '@tanstack/react-query';
import { discountKeys, fetchDiscounts } from '@/services/discount';

export function useDiscountsQuery() {
  return useQuery({
    queryKey: discountKeys.list(),
    queryFn: async () => (await fetchDiscounts()).data,
  });
}
