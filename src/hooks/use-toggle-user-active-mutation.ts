import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { updateUser } from '@/services/auth';
import { type User } from '@/types/auth';
import { adminUserKeys } from '@/services/user';
import { ApiError } from '@/services/http';

export function useToggleUserActiveMutation() {
  const { t } = useTranslation();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (user: User) => updateUser(user.id, { isActive: !user.isActive }),
    onSuccess: () => {
      toast.success('User updated');
      void qc.invalidateQueries({ queryKey: adminUserKeys.all });
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('common.error')),
  });
}
