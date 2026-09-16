import { apiDelete, apiGet, apiPatch, apiPost } from '@/services/http';
import type { ApiData, ApiMessage } from '@/services/http';
import type { CreatePermissionInput, Permission, UpdatePermissionInput } from '@/types/permission';

export const permissionKeys = {
  all: ['permissions'] as const,
  list: () => [...permissionKeys.all, 'list'] as const,
};

export const fetchPermissions = () => apiGet<ApiData<Permission[]>>('/permissions');

export const createPermission = (input: CreatePermissionInput) =>
  apiPost<ApiData<Permission>>('/permissions', input);

export const updatePermission = (id: string, input: UpdatePermissionInput) =>
  apiPatch<ApiData<Permission>>(`/permissions/${id}`, input);

export const deletePermission = (id: string) => apiDelete<ApiMessage>(`/permissions/${id}`);
