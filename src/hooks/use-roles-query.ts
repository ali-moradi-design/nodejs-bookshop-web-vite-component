import { useQuery } from '@tanstack/react-query';
import { roleKeys, fetchRoles } from '@/services/role';

export function useRolesQuery() {
  return useQuery({
    queryKey: roleKeys.list(),
    queryFn: async () => (await fetchRoles()).data,
  });
}
