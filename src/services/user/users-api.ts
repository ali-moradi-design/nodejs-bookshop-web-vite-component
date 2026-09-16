import { apiDelete, apiGet, apiPost } from '@/services/http';
import type { ApiData, ApiMessage } from '@/services/http';
import type { CreateUserInput, User } from '@/types/auth';

export const adminUserKeys = {
  all: ['users'] as const,
  list: () => [...adminUserKeys.all, 'list'] as const,
  detail: (id: string) => [...adminUserKeys.all, 'detail', id] as const,
};

export const fetchUsers = () => apiGet<ApiData<User[]>>('/users');

export const fetchUser = (id: string) => apiGet<ApiData<User>>(`/users/${id}`);

export const createUser = (input: CreateUserInput) => apiPost<ApiData<User>>('/users', input);

export const deleteUser = (id: string) => apiDelete<ApiMessage>(`/users/${id}`);
