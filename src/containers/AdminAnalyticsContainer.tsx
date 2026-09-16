import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminPageHeader } from '@/components/AdminPageHeader';
import { PageLoader } from '@/components/Spinner';
import { usePageTitle } from '@/hooks';

const AdminCharts = lazy(() =>
  import('@/components/AdminCharts').then((m) => ({ default: m.AdminCharts })),
);

export function AdminAnalyticsContainer() {
  const { t } = useTranslation();
  usePageTitle(t('nav.analytics'));
  return (
    <div className="space-y-6">
      <AdminPageHeader title={t('nav.analytics')} />
      <Suspense fallback={<PageLoader />}>
        <AdminCharts />
      </Suspense>
    </div>
  );
}
