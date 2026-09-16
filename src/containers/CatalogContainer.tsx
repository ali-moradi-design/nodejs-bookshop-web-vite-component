import { useTranslation } from 'react-i18next';
import { ActiveFilterChips } from '@/components/ActiveFilterChips';
import { BookFilters } from '@/components/CatalogFilters';
import { useBookFilters } from '@/hooks';
import { useCatalogBooks } from '@/hooks';
import { BookGrid, BookGridSkeleton } from '@/components/BookGrid';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { ApiError } from '@/services/http';
import { usePageTitle } from '@/hooks';

export function CatalogContainer() {
  const { t } = useTranslation();
  usePageTitle(t('catalog.title'));
  const filters = useBookFilters(12);
  const { books, hasMore, isLoading, isFetching, error, refetch } = useCatalogBooks(filters);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('catalog.title')}</h1>
      <BookFilters {...filters} />
      <ActiveFilterChips filters={filters} />

      {isLoading && filters.page <= 1 ? <BookGridSkeleton count={12} /> : null}
      {error ? (
        <Alert variant="destructive">
          {error instanceof ApiError ? error.message : t('common.error')}{' '}
          <button type="button" className="underline" onClick={() => void refetch()}>
            {t('common.retry')}
          </button>
        </Alert>
      ) : null}
      {!isLoading && !error && books.length === 0 ? (
        <EmptyState
          title={t('catalog.noResults')}
          action={
            <Button type="button" variant="outline" onClick={filters.resetFilters}>
              {t('catalog.clearFilters')}
            </Button>
          }
        />
      ) : null}
      {books.length > 0 ? <BookGrid books={books} withFavorites /> : null}

      {hasMore ? (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            disabled={isFetching}
            onClick={() => filters.setPage((p) => p + 1)}
          >
            {t('catalog.loadMore')}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
