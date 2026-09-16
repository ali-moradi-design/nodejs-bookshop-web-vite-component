import { useAuthStore } from '@/store/auth-store';
import { useOrdersQuery, useFavoritesQuery, useReviewsQuery } from '@/hooks';
import { DashboardPanel } from '@/components/DashboardPanel';
import { PageLoader } from '@/components/Spinner';

export function DashboardContainer() {
  const user = useAuthStore((s) => s.user);

  const ordersQ = useOrdersQuery();
  const favQ = useFavoritesQuery();
  const reviewsQ = useReviewsQuery({ user: user?.id, limit: 100 }, { enabled: Boolean(user?.id) });

  if (ordersQ.isLoading || favQ.isLoading) return <PageLoader />;

  return (
    <DashboardPanel
      userName={user?.name}
      userEmail={user?.email}
      ordersCount={ordersQ.data?.length ?? 0}
      favoritesCount={favQ.data?.length ?? 0}
      reviewsCount={reviewsQ.data?.length ?? 0}
    />
  );
}
