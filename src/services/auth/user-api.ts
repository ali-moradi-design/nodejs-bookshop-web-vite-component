import { apiGet, apiPatch, apiPost } from '@/services/http';
import type { ApiData } from '@/services/http';
import type { AuthResponse, UpdateUserInput, User } from '@/types/auth';

export const userKeys = {
  all: ['users'] as const,
  me: () => [...userKeys.all, 'me'] as const,
};

export const login = (email: string, password: string) =>
  apiPost<AuthResponse>('/auth/login', { email, password }, { skipRefresh: true });

export const register = (input: { name: string; email: string; password: string }) =>
  apiPost<AuthResponse>('/auth/register', input, { skipRefresh: true });

export const logout = () => apiPost<{ message: string }>('/auth/logout', {}, { skipRefresh: true });

export const refreshSession = () =>
  apiPost<AuthResponse>('/auth/refresh', {}, { skipRefresh: true });

export const fetchMe = () => apiGet<ApiData<User>>('/users/me');

export const updateUser = (id: string, input: UpdateUserInput) =>
  apiPatch<ApiData<User>>(`/users/${id}`, input);
