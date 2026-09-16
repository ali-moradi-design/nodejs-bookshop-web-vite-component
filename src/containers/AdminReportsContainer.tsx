import { useTranslation } from 'react-i18next';
import { AdminReportsPanel } from '@/components/AdminReportsPanel';
import { AdminPageHeader } from '@/components/AdminPageHeader';
import { usePageTitle } from '@/hooks';

export function AdminReportsContainer() {
  const { t } = useTranslation();
  usePageTitle(t('nav.reports'));
  return (
    <div className="space-y-6">
      <AdminPageHeader title={t('nav.reports')} />
      <AdminReportsPanel />
    </div>
  );
}
