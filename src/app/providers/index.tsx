import { Toaster } from 'sonner';
import { QueryProvider } from '@/app/providers/query-provider';
import { ThemeProvider } from '@/app/providers/theme-provider';
import { I18nProvider } from '@/app/providers/i18n-provider';
import { AuthBootstrap } from '@/app/providers/auth-bootstrap';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <I18nProvider>
        <ThemeProvider>
          <AuthBootstrap>
            {children}
            <Toaster richColors position="top-center" />
          </AuthBootstrap>
        </ThemeProvider>
      </I18nProvider>
    </QueryProvider>
  );
}
