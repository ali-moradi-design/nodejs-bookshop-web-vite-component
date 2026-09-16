import { useTranslation } from 'react-i18next';
import { AdminDiscountsPanel } from '@/components/AdminDiscountsPanel';
import { AdminPageHeader } from '@/components/AdminPageHeader';
import { usePageTitle } from '@/hooks';

export function AdminDiscountsContainer() {
  const { t } = useTranslation();
  usePageTitle(t('nav.discounts'));
  return (
    <div className="space-y-6">
      <AdminPageHeader title={t('nav.discounts')} />
      <AdminDiscountsPanel />
    </div>
  );
}
