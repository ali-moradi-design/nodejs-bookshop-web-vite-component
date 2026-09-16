import { useTranslation } from 'react-i18next';
import { AdminPermissionsPanel } from '@/components/AdminPermissionsPanel';
import { AdminPageHeader } from '@/components/AdminPageHeader';
import { usePageTitle } from '@/hooks';

export function AdminPermissionsContainer() {
  const { t } = useTranslation();
  usePageTitle(t('nav.permissions'));
  return (
    <div className="space-y-6">
      <AdminPageHeader title={t('nav.permissions')} />
      <AdminPermissionsPanel />
    </div>
  );
}
