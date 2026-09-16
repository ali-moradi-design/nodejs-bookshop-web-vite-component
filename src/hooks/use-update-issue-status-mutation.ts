import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { reportKeys } from '@/services/report';
import { updateIssue } from '@/services/report';
import type { IssueStatus } from '@/types/report';
import { ApiError } from '@/services/http';

export function useUpdateIssueStatusMutation() {
  const { t } = useTranslation();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: IssueStatus }) =>
      updateIssue(id, { status }),
    onSuccess: () => {
      toast.success('Issue updated');
      void qc.invalidateQueries({ queryKey: reportKeys.issues() });
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('common.error')),
  });
}
