import { useTranslation } from 'react-i18next';
import { AdminRolesPanel } from '@/components/AdminRolesPanel';
import { AdminPageHeader } from '@/components/AdminPageHeader';
import { usePageTitle } from '@/hooks';

export function AdminRolesContainer() {
  const { t } = useTranslation();
  usePageTitle(t('nav.roles'));
  return (
    <div className="space-y-6">
      <AdminPageHeader title={t('nav.roles')} />
      <AdminRolesPanel />
    </div>
  );
}
