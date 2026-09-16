import { useTranslation } from 'react-i18next';
import { ReportIssueForm } from '@/components/ReportIssueForm';
import { usePageTitle } from '@/hooks';

export function ReportIssueContainer() {
  const { t } = useTranslation();
  usePageTitle(t('nav.report'));
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('nav.report')}</h1>
      <ReportIssueForm />
    </div>
  );
}
