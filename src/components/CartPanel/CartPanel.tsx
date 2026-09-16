import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Book } from '@/types/book';
import type { CartItem } from '@/types/cart';
import { BookCoverImage } from '@/components/BookCoverImage';
import { CartLineControls } from '@/components/CartLineControls';
import { ClearCartButton } from '@/components/ClearCartButton';
import { formatMoney } from '@/utils';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { PageLoader } from '@/components/Spinner';
import { Skeleton } from '@/components/Skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';

export type CartRow = {
  item: CartItem;
  book?: Book;
  line: number;
  loading?: boolean;
};

export type CartPanelProps = {
  isAuthenticated: boolean;
  isLoading?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
  rows: CartRow[];
  subtotal: number;
  locale: string;
};

export function CartPanel({
  isAuthenticated,
  isLoading,
  errorMessage,
  onRetry,
  rows,
  subtotal,
  locale,
}: CartPanelProps) {
  const { t } = useTranslation();

  if (!isAuthenticated) {
    return (
      <EmptyState
        title={t('cart.title')}
        description={t('cart.loginHint')}
        action={
          <Button asChild>
            <Link to="/login">{t('nav.login')}</Link>
          </Button>
        }
      />
    );
  }

  if (isLoading) return <PageLoader />;
  if (errorMessage) {
    return (
      <Alert variant="destructive">
        {errorMessage}{' '}
        {onRetry ? (
          <button type="button" className="underline" onClick={onRetry}>
            {t('common.retry')}
          </button>
        ) : null}
      </Alert>
    );
  }

  if (rows.length === 0) {
    return (
      <EmptyState
        title={t('cart.empty')}
        description={t('cart.emptyHint')}
        action={
          <Button asChild>
            <Link to="/catalog">{t('nav.catalog')}</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('cart.title')}</h1>
        <ClearCartButton />
      </div>
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>{t('cart.quantity')}</TableHead>
              <TableHead>{t('book.price')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(({ item, book, line, loading }) => (
              <TableRow key={item.bookId}>
                <TableCell>
                  <div className="flex items-start gap-3">
                    <Link
                      to={`/books/${item.bookId}`}
                      className="relative block h-16 w-12 shrink-0 overflow-hidden rounded-md border bg-muted shadow-sm"
                    >
                      {loading ? (
                        <Skeleton className="absolute inset-0 h-full w-full rounded-md" />
                      ) : (
                        <BookCoverImage
                          coverImageUrl={book?.coverImageUrl}
                          alt={book?.title ?? item.bookId}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}
                    </Link>
                    <div className="min-w-0">
                      <Link to={`/books/${item.bookId}`} className="font-medium hover:underline">
                        {book?.title ?? item.bookId}
                      </Link>
                      <div className="text-xs text-muted-foreground">{book?.author}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <CartLineControls bookId={item.bookId} quantity={item.quantity} />
                </TableCell>
                <TableCell className="font-medium tabular-nums">
                  {formatMoney(line, book?.currency || 'USD', locale)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between rounded-xl border bg-card p-4">
        <div className="text-lg font-semibold">
          {t('cart.subtotal')}: {formatMoney(subtotal, 'USD', locale)}
        </div>
        <Button asChild>
          <Link to="/checkout">{t('cart.checkout')}</Link>
        </Button>
      </div>
    </div>
  );
}
