import { apiDelete, apiGet, apiPatch, apiPost } from '@/services/http';
import type { ApiData, ApiMessage } from '@/services/http';
import type { CreateIssueInput, IssueReport, UpdateIssueInput } from '@/types/report';

export const reportKeys = {
  all: ['reports'] as const,
  issues: () => [...reportKeys.all, 'issues'] as const,
};

export const fetchIssues = () => apiGet<ApiData<IssueReport[]>>('/reports/issues');

export const createIssue = (input: CreateIssueInput) =>
  apiPost<ApiData<IssueReport>>('/reports/issues', input);

export const updateIssue = (id: string, input: UpdateIssueInput) =>
  apiPatch<ApiData<IssueReport>>(`/reports/issues/${id}`, input);

export const deleteIssue = (id: string) => apiDelete<ApiMessage>(`/reports/issues/${id}`);
