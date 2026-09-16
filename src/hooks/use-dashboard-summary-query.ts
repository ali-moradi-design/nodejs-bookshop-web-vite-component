import { useQuery } from '@tanstack/react-query';
import { adminKeys, fetchDashboardSummary } from '@/services/admin';

export function useDashboardSummaryQuery() {
  return useQuery({
    queryKey: adminKeys.summary(),
    queryFn: async () => (await fetchDashboardSummary()).data,
  });
}
