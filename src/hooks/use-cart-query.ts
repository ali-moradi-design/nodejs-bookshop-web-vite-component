import { useQuery } from '@tanstack/react-query';
import { cartKeys, fetchCart } from '@/services/cart';

type Options = {
  enabled?: boolean;
};

export function useCartQuery(options: Options = {}) {
  const { enabled = true } = options;
  return useQuery({
    queryKey: cartKeys.current(),
    queryFn: async () => (await fetchCart()).data,
    enabled,
  });
}
