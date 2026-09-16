import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { favoriteKeys, removeFavorite } from '@/services/favorite';
import { ApiError } from '@/services/http';

export function useRemoveFavoriteMutation(bookId: string) {
  const { t } = useTranslation();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => removeFavorite(bookId),
    onSuccess: () => void qc.invalidateQueries({ queryKey: favoriteKeys.all }),
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('common.error')),
  });
}
