import { useQuery } from '@tanstack/react-query';
import { reviewKeys, fetchReviews } from '@/services/review';
import type { Review, ReviewListParams } from '@/types/review';

type Options = {
  enabled?: boolean;
};

export function useReviewsQuery(params: ReviewListParams = {}, options: Options = {}) {
  const { enabled = true } = options;
  return useQuery({
    queryKey: reviewKeys.list(params),
    queryFn: async () => {
      const res = await fetchReviews({ ...params, limit: params.limit ?? 100 });
      return Array.isArray((res as { data: unknown }).data) ? (res as { data: Review[] }).data : [];
    },
    enabled,
  });
}
