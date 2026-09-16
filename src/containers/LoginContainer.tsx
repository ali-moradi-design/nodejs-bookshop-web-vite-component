import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/components/LoginForm';
import { usePageTitle } from '@/hooks';

export function LoginContainer() {
  const { t } = useTranslation();
  usePageTitle(t('nav.login'));
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">
      <LoginForm />
    </div>
  );
}
