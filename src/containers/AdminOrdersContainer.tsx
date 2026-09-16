import { useTranslation } from 'react-i18next';
import { AdminOrdersPanel } from '@/components/AdminOrdersPanel';
import { AdminPageHeader } from '@/components/AdminPageHeader';
import { usePageTitle } from '@/hooks';

export function AdminOrdersContainer() {
  const { t } = useTranslation();
  usePageTitle(t('admin.manageOrders'));
  return (
    <div className="space-y-6">
      <AdminPageHeader title={t('admin.manageOrders')} />
      <AdminOrdersPanel />
    </div>
  );
}
