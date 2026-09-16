import { useTranslation } from 'react-i18next';
import { CartPanel } from '@/components/CartPanel';
import { useCartQuery, useCartBooksQueries, usePreferences, usePageTitle } from '@/hooks';
import { useAuthStore } from '@/store/auth-store';
import { ApiError } from '@/services/http';

export function CartContainer() {
  const { t } = useTranslation();
  usePageTitle(t('cart.title'));
  const locale = usePreferences((s) => s.locale);
  const user = useAuthStore((s) => s.user);

  const cartQuery = useCartQuery({ enabled: Boolean(user) });
  const items = cartQuery.data?.items ?? [];
  const bookQueries = useCartBooksQueries(
    items.map((item) => item.bookId),
    { enabled: Boolean(user) },
  );

  const rows = items.map((item, i) => {
    const book = bookQueries[i]?.data;
    const loading = bookQueries[i]?.isLoading;
    const line = (book?.price ?? 0) * item.quantity;
    return { item, book, line, loading };
  });
  const subtotal = rows.reduce((sum, row) => sum + row.line, 0);

  const errorMessage =
    cartQuery.error instanceof ApiError
      ? cartQuery.error.message
      : cartQuery.error
        ? t('common.error')
        : null;

  return (
    <CartPanel
      isAuthenticated={Boolean(user)}
      isLoading={cartQuery.isLoading}
      errorMessage={errorMessage}
      onRetry={() => void cartQuery.refetch()}
      rows={rows}
      subtotal={subtotal}
      locale={locale}
    />
  );
}
