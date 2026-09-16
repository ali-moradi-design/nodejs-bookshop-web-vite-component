import { useMemo } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useOrdersQuery } from '@/hooks';
import { type Order, type OrderStatus } from '@/types/order';
import { ORDER_STATUSES } from '@/types/order';
import { DataTable } from '@/components/DataTable';
import { formatMoney, formatDate } from '@/utils';
import { usePreferences } from '@/hooks';
import { ApiError } from '@/services/http';
import { Alert } from '@/components/Alert';
import { Badge } from '@/components/Badge';
import { PageLoader } from '@/components/Spinner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { useUpdateOrderStatusMutation } from '@/hooks';

export function AdminOrdersPanel() {
  const { t } = useTranslation();
  const locale = usePreferences((s) => s.locale);
  const { data, isLoading, error } = useOrdersQuery();
  const update = useUpdateOrderStatusMutation();

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <span className="font-mono text-xs">{row.original.id.slice(-10)}</span>,
      },
      {
        accessorKey: 'status',
        header: t('common.status'),
        cell: ({ row }) => (
          <Select
            value={row.original.status}
            onValueChange={(v) => update.mutate({ id: row.original.id, status: v as OrderStatus })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ),
      },
      {
        accessorKey: 'payment',
        header: 'Payment',
        cell: ({ row }) => <Badge variant="outline">{row.original.payment.status}</Badge>,
      },
      {
        accessorKey: 'totalAmount',
        header: 'Total',
        cell: ({ row }) => formatMoney(row.original.totalAmount, 'USD', locale),
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ row }) => formatDate(row.original.createdAt, locale),
      },
    ],
    [t, locale, update],
  );

  if (isLoading) return <PageLoader />;
  if (error) {
    return (
      <Alert variant="destructive">
        {error instanceof ApiError ? error.message : t('common.error')}
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t('admin.manageOrders')}</h1>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
}
