import { useTranslation } from 'react-i18next';
import { AdminUsersPanel } from '@/components/AdminUsersPanel';
import { AdminPageHeader } from '@/components/AdminPageHeader';
import { usePageTitle } from '@/hooks';

export function AdminUsersContainer() {
  const { t } = useTranslation();
  usePageTitle(t('admin.manageUsers'));
  return (
    <div className="space-y-6">
      <AdminPageHeader title={t('admin.manageUsers')} />
      <AdminUsersPanel />
    </div>
  );
}
