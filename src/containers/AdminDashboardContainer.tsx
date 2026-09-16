import { useTranslation } from 'react-i18next';
import {
  useDashboardSummaryQuery,
  useLowStockQuery,
  useRecentOrdersQuery,
  usePreferences,
  usePageTitle,
} from '@/hooks';
import { AdminDashboardPanel } from '@/components/AdminDashboardPanel';
import { Alert } from '@/components/Alert';
import { PageLoader } from '@/components/Spinner';
import { ApiError } from '@/services/http';

export function AdminDashboardContainer() {
  const { t } = useTranslation();
  usePageTitle(t('admin.summary'));
  const locale = usePreferences((s) => s.locale);

  const summaryQ = useDashboardSummaryQuery();
  const recentQ = useRecentOrdersQuery(8);
  const lowQ = useLowStockQuery(5);

  if (summaryQ.isLoading) return <PageLoader />;
  if (summaryQ.error || !summaryQ.data) {
    return (
      <Alert variant="destructive">
        {summaryQ.error instanceof ApiError ? summaryQ.error.message : t('common.error')}
      </Alert>
    );
  }

  return (
    <AdminDashboardPanel
      summary={summaryQ.data}
      recentOrders={recentQ.data ?? []}
      lowStockBooks={lowQ.data ?? []}
      locale={locale}
    />
  );
}
