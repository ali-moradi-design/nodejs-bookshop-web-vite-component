import { useTranslation } from 'react-i18next';
import { RegisterForm } from '@/components/RegisterForm';
import { usePageTitle } from '@/hooks';

export function RegisterContainer() {
  const { t } = useTranslation();
  usePageTitle(t('nav.register'));
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">
      <RegisterForm />
    </div>
  );
}
