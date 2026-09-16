import { useTranslation } from 'react-i18next';
import { AdminBooksPanel } from '@/components/AdminBooksPanel';
import { AdminPageHeader } from '@/components/AdminPageHeader';
import { usePageTitle } from '@/hooks';

export function AdminBooksContainer() {
  const { t } = useTranslation();
  usePageTitle(t('admin.manageBooks'));
  return (
    <div className="space-y-6">
      <AdminPageHeader title={t('admin.manageBooks')} />
      <AdminBooksPanel />
    </div>
  );
}
