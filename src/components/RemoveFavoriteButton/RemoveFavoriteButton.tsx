import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { useRemoveFavoriteMutation } from '@/hooks';

type Props = { bookId: string };

export function RemoveFavoriteButton({ bookId }: Props) {
  const { t } = useTranslation();
  const remove = useRemoveFavoriteMutation(bookId);

  return (
    <Button variant="outline" size="sm" onClick={() => remove.mutate()}>
      {t('common.delete')}
    </Button>
  );
}
