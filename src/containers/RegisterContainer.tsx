import { useTranslation } from 'react-i18next';
import { RegisterForm } from '@/components/RegisterForm';
import { AuthCard } from '@/components/AuthCard';
import { usePageTitle } from '@/hooks';

export function RegisterContainer() {
  const { t } = useTranslation();
  usePageTitle(t('nav.register'));
  return (
    <AuthCard>
      <RegisterForm />
    </AuthCard>
  );
}
