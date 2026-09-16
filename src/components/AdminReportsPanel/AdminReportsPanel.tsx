import { useMemo } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useIssuesQuery } from '@/hooks';
import { type IssueReport } from '@/types/report';
import { ISSUE_STATUSES } from '@/types/report';
import type { IssueStatus } from '@/types/report';
import { DataTable } from '@/components/DataTable';
import { formatDate } from '@/utils';
import { usePreferences } from '@/hooks';
import { ApiError } from '@/services/http';
import { Alert } from '@/components/Alert';
import { PageLoader } from '@/components/Spinner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { useUpdateIssueStatusMutation } from '@/hooks';

export function AdminReportsPanel() {
  const { t } = useTranslation();
  const locale = usePreferences((s) => s.locale);
  const { data, isLoading, error } = useIssuesQuery();
  const update = useUpdateIssueStatusMutation();

  const columns = useMemo<ColumnDef<IssueReport>[]>(
    () => [
      { accessorKey: 'subject', header: 'Subject' },
      { accessorKey: 'type', header: 'Type' },
      {
        accessorKey: 'status',
        header: t('common.status'),
        cell: ({ row }) => (
          <Select
            value={row.original.status}
            onValueChange={(v) => update.mutate({ id: row.original.id, status: v as IssueStatus })}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ISSUE_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ),
      },
      {
        id: 'reporter',
        header: 'Reporter',
        cell: ({ row }) => row.original.populated?.reporter?.email || row.original.reporter,
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
      <h1 className="text-2xl font-bold">{t('nav.reports')}</h1>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
}
