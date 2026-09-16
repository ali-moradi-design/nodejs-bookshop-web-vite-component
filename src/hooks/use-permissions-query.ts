import { useQuery } from '@tanstack/react-query';
import { permissionKeys, fetchPermissions } from '@/services/permission';

export function usePermissionsQuery() {
  return useQuery({
    queryKey: permissionKeys.list(),
    queryFn: async () => (await fetchPermissions()).data,
  });
}
