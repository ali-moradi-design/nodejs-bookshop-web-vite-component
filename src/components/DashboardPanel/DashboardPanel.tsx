import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { KpiCards } from '@/components/KpiCards';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';

type Props = {
  userName?: string;
  userEmail?: string;
  ordersCount: number;
  favoritesCount: number;
  reviewsCount: number;
};

export function DashboardPanel({
  userName,
  userEmail,
  ordersCount,
  favoritesCount,
  reviewsCount,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          {t('panel.welcome')}
          {userName ? `, ${userName}` : ''}
        </h1>
        <p className="text-muted-foreground">{userEmail}</p>
      </div>
      <KpiCards
        items={[
          { label: t('panel.ordersCount'), value: ordersCount },
          { label: t('panel.favoritesCount'), value: favoritesCount },
          { label: t('panel.reviewsCount'), value: reviewsCount },
        ]}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { href: '/panel/orders', label: t('nav.orders') },
          { href: '/panel/favorites', label: t('nav.favorites') },
          { href: '/panel/report', label: t('nav.report') },
        ].map((item) => (
          <Card key={item.href}>
            <CardHeader>
              <CardTitle className="text-base">{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" size="sm">
                <Link to={item.href}>{t('common.next')}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
