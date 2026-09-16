import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookDetailPanel } from '@/components/BookDetailPanel';
import {
  useBookQuery,
  useReviewsQuery,
  useTrackRecentlyViewed,
  usePreferences,
  usePageTitle,
} from '@/hooks';
import { useAuthStore } from '@/store/auth-store';
import { ApiError } from '@/services/http';

export function BookDetailContainer() {
  const { t } = useTranslation();
  const params = useParams();
  const bookId = String(params?.id ?? '');
  const locale = usePreferences((s) => s.locale);
  const user = useAuthStore((s) => s.user);

  const bookQuery = useBookQuery(bookId);
  useTrackRecentlyViewed(bookQuery.data);
  usePageTitle(bookQuery.data?.title ?? t('nav.catalog'));

  const reviewsQuery = useReviewsQuery({ book: bookId, limit: 50 }, { enabled: Boolean(bookId) });

  const errorMessage =
    bookQuery.error instanceof ApiError
      ? bookQuery.error.message
      : bookQuery.error
        ? t('common.error')
        : null;

  return (
    <BookDetailPanel
      bookId={bookId}
      book={bookQuery.data}
      reviews={reviewsQuery.data ?? []}
      isLoading={bookQuery.isLoading}
      errorMessage={errorMessage}
      locale={locale}
      isAuthenticated={Boolean(user)}
      currentUserId={user?.id}
    />
  );
}
