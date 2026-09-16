import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { type Order } from '@/types/order';
import { DataTable } from '@/components/DataTable';
import { formatMoney, formatDate } from '@/utils';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';

type Props = {
  orders: Order[];
  locale: string;
};

export function OrdersTable({ orders, locale }: Props) {
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => (
          <Link className="text-primary underline" to={`/panel/orders/${row.original.id}`}>
            {row.original.id.slice(-8)}
          </Link>
        ),
      },
      {
        accessorKey: 'status',
        header: t('common.status'),
        cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge>,
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
      {
        id: 'actions',
        header: t('common.actions'),
        cell: ({ row }) => (
          <Button asChild size="sm" variant="outline">
            <Link to={`/panel/orders/${row.original.id}`}>{t('panel.orderDetail')}</Link>
          </Button>
        ),
      },
    ],
    [t, locale],
  );

  return <DataTable columns={columns} data={orders} />;
}
