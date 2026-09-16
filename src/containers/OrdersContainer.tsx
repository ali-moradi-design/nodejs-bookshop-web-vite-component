import { useTranslation } from 'react-i18next';
import { useOrdersQuery, usePreferences, usePageTitle } from '@/hooks';
import { OrdersTable } from '@/components/OrdersTable';
import { Alert } from '@/components/Alert';
import { PageLoader } from '@/components/Spinner';
import { ApiError } from '@/services/http';

export function OrdersContainer() {
  const { t } = useTranslation();
  usePageTitle(t('nav.orders'));
  const locale = usePreferences((s) => s.locale);
  const { data, isLoading, error } = useOrdersQuery();

  if (isLoading) return <PageLoader />;
  if (error) {
    return (
      <Alert variant="destructive">
        {error instanceof ApiError ? error.message : t('common.error')}
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t('nav.orders')}</h1>
      <OrdersTable orders={data ?? []} locale={locale} />
    </div>
  );
}
