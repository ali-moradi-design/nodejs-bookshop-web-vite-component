import { useQuery } from '@tanstack/react-query';
import { reportKeys, fetchIssues } from '@/services/report';

export function useIssuesQuery() {
  return useQuery({
    queryKey: reportKeys.issues(),
    queryFn: async () => (await fetchIssues()).data,
  });
}
