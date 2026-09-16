import { useTranslation } from 'react-i18next';
import { useFeaturedBooksQuery, usePageTitle } from '@/hooks';
import { HomeHero } from '@/components/HomeHero';
import { FeaturedBooksSection } from '@/components/FeaturedBooksSection';
import { RecentlyViewedSection } from '@/components/RecentlyViewedSection';
import { useAuthStore } from '@/store/auth-store';
import { ApiError } from '@/services/http';

export function HomeContainer() {
  const { t } = useTranslation();
  usePageTitle(t('nav.home'));
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, error, refetch } = useFeaturedBooksQuery();

  const errorMessage = error instanceof ApiError ? error.message : error ? t('common.error') : null;

  return (
    <div className="space-y-10">
      <HomeHero />
      <FeaturedBooksSection
        books={data}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onRetry={() => void refetch()}
        isAuthenticated={Boolean(user)}
      />
      <RecentlyViewedSection />
    </div>
  );
}
