import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFavoritesQuery, usePreferences, usePageTitle } from '@/hooks';
import { FavoritesList } from '@/components/FavoritesList';
import { ApiError } from '@/services/http';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { PageLoader } from '@/components/Spinner';

export function FavoritesContainer() {
  const { t } = useTranslation();
  usePageTitle(t('nav.favorites'));
  const locale = usePreferences((s) => s.locale);
  const { data, isLoading, error, refetch } = useFavoritesQuery();

  if (isLoading) return <PageLoader />;
  if (error) {
    return (
      <Alert variant="destructive">
        {error instanceof ApiError ? error.message : t('common.error')}{' '}
        <button type="button" className="underline" onClick={() => void refetch()}>
          {t('common.retry')}
        </button>
      </Alert>
    );
  }
  if (!data?.length) {
    return (
      <EmptyState
        title={t('nav.favorites')}
        description={t('favorites.emptyHint')}
        action={
          <Button asChild>
            <Link to="/catalog">{t('favorites.browseCatalog')}</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t('nav.favorites')}</h1>
      <FavoritesList favorites={data} locale={locale} />
    </div>
  );
}
