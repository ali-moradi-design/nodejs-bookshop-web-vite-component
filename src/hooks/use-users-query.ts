import { useQuery } from '@tanstack/react-query';
import { adminUserKeys, fetchUsers } from '@/services/user';

export function useUsersQuery() {
  return useQuery({
    queryKey: adminUserKeys.list(),
    queryFn: async () => (await fetchUsers()).data,
  });
}
