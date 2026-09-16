import { useTranslation } from 'react-i18next';
import type { Book } from '@/types/book';
import type { Review } from '@/types/review';
import { BookCoverImage } from '@/components/BookCoverImage';
import { BookDetailSkeleton } from '@/components/BookDetailSkeleton';
import { AddToCartButton } from '@/components/AddToCartButton';
import { FavoriteToggleButton } from '@/components/FavoriteToggleButton';
import { CreateReviewForm } from '@/components/CreateReviewForm';
import { LoveRating } from '@/components/LoveRating';
import { ReviewList } from '@/components/ReviewList';
import { formatMoney } from '@/utils';
import { Alert } from '@/components/Alert';
import { Badge } from '@/components/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';

export type BookDetailPanelProps = {
  bookId: string;
  book?: Book;
  reviews?: Review[];
  isLoading?: boolean;
  errorMessage?: string | null;
  locale: string;
  isAuthenticated: boolean;
  currentUserId?: string;
};

export function BookDetailPanel({
  bookId,
  book,
  reviews = [],
  isLoading,
  errorMessage,
  locale,
  isAuthenticated,
  currentUserId,
}: BookDetailPanelProps) {
  const { t } = useTranslation();

  if (isLoading) return <BookDetailSkeleton />;
  if (errorMessage || !book) {
    return <Alert variant="destructive">{errorMessage ?? t('common.error')}</Alert>;
  }

  const averageRating =
    reviews.length === 0
      ? null
      : Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length);

  const myReview = currentUserId ? reviews.find((r) => r.user === currentUserId) : undefined;

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border bg-muted">
        <BookCoverImage
          coverImageUrl={book.coverImageUrl}
          alt={book.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            {book.featured ? <Badge>{t('book.featured')}</Badge> : null}
          </div>
          <p className="text-muted-foreground">
            {t('book.author')}: {book.author}
          </p>
          {averageRating != null ? (
            <div className="flex h-8 flex-wrap items-center gap-2">
              <LoveRating
                value={averageRating}
                readOnly
                size="md"
                aria-label={t('book.averageRating')}
              />
              <span className="flex h-8 items-center text-sm leading-none text-muted-foreground">
                {t('book.averageRatingValue', {
                  rating: averageRating,
                  count: reviews.length,
                })}
              </span>
            </div>
          ) : null}
          <p className="text-2xl font-semibold">{formatMoney(book.price, book.currency, locale)}</p>
          <p className="text-sm text-muted-foreground">
            {book.stock > 0 ? `${t('book.stock')}: ${book.stock}` : t('book.outOfStock')}
          </p>
          {book.categories?.length ? (
            <div className="flex flex-wrap gap-1">
              {book.categories.map((c) => (
                <Badge key={c} variant="secondary">
                  {c}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
        <p className="leading-relaxed text-muted-foreground">{book.description}</p>
        <div className="flex flex-wrap gap-2">
          <AddToCartButton bookId={bookId} disabled={book.stock <= 0 || !isAuthenticated} />
          <FavoriteToggleButton bookId={bookId} isAuthenticated={isAuthenticated} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('book.reviews')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAuthenticated ? (
              <CreateReviewForm
                key={myReview?.id ?? 'new'}
                bookId={bookId}
                existingReview={myReview}
              />
            ) : null}
            <ReviewList reviews={reviews} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
