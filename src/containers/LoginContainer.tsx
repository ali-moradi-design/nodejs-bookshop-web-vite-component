import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/components/LoginForm';
import { AuthCard } from '@/components/AuthCard';
import { usePageTitle } from '@/hooks';

export function LoginContainer() {
  const { t } = useTranslation();
  usePageTitle(t('nav.login'));
  return (
    <AuthCard>
      <LoginForm />
    </AuthCard>
  );
}
