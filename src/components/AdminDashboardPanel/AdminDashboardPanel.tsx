import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import type { DashboardSummary } from '@/types/admin';
import type { Order } from '@/types/order';
import type { Book } from '@/types/book';
import { KpiCards } from '@/components/KpiCards';
import { formatMoney, formatDate } from '@/utils';
import { AdminPageHeader } from '@/components/AdminPageHeader';
import { Badge } from '@/components/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { PageLoader } from '@/components/Spinner';

const AdminCharts = lazy(() =>
  import('@/components/AdminCharts').then((m) => ({ default: m.AdminCharts })),
);

type Props = {
  summary: DashboardSummary;
  recentOrders: Order[];
  lowStockBooks: Book[];
  locale: string;
};

export function AdminDashboardPanel({ summary, recentOrders, lowStockBooks, locale }: Props) {
  const { t } = useTranslation();
  const s = summary;

  return (
    <div className="space-y-6">
      <AdminPageHeader title={t('admin.summary')} />
      <KpiCards
        items={[
          { label: t('nav.users'), value: s.users },
          { label: t('nav.books'), value: s.books },
          { label: t('nav.orders'), value: s.orders },
          { label: t('admin.revenue'), value: formatMoney(s.revenue, 'USD', locale) },
          { label: t('admin.openIssues'), value: s.openIssueReports },
          { label: t('admin.lowStock'), value: s.lowStock },
        ]}
      />
      <Suspense fallback={<PageLoader />}>
        <AdminCharts />
      </Suspense>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.recentOrders')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between text-sm">
                <span className="font-mono">{o.id.slice(-8)}</span>
                <Badge variant="secondary">{o.status}</Badge>
                <span>{formatMoney(o.totalAmount, 'USD', locale)}</span>
                <span className="text-muted-foreground">{formatDate(o.createdAt, locale)}</span>
              </div>
            ))}
            {!recentOrders.length ? (
              <p className="text-sm text-muted-foreground">{t('common.empty')}</p>
            ) : null}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.lowStock')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {lowStockBooks.map((b) => (
              <div key={b.id} className="flex items-center justify-between text-sm">
                <span>{b.title}</span>
                <Badge variant="destructive">{b.stock}</Badge>
              </div>
            ))}
            {!lowStockBooks.length ? (
              <p className="text-sm text-muted-foreground">{t('common.empty')}</p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
