import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/auth-store';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { HeaderBookSearch } from '@/components/HeaderBookSearch';
import { CartBadgeLink } from '@/components/CartBadgeLink';
import { Button } from '@/components/Button';
import { isAdminUser } from '@/types/auth';

export function Header() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[120rem] items-center justify-between gap-4 px-4 md:h-[4.5rem]">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 font-semibold">
            <img
              src="/logo.png"
              alt=""
              width={56}
              height={56}
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            />
            <span className="text-base sm:text-lg">{t('common.appName')}</span>
          </Link>
          <nav className="hidden items-center gap-4 text-sm md:flex">
            <Link to="/catalog" className="text-muted-foreground hover:text-foreground">
              {t('nav.catalog')}
            </Link>
            {user ? (
              <Link to="/panel" className="text-muted-foreground hover:text-foreground">
                {t('nav.account')}
              </Link>
            ) : null}
            {isAdminUser(user) ? (
              <Link to="/admin" className="text-muted-foreground hover:text-foreground">
                {t('nav.admin')}
              </Link>
            ) : null}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <HeaderBookSearch />
          <LocaleSwitcher />
          <ThemeSwitcher />
          <CartBadgeLink enabled={Boolean(user)} />
          {user ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/panel" aria-label={t('nav.account')}>
                  <User />
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => void logout()}>
                {t('nav.logout')}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">{t('nav.login')}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">{t('nav.register')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
