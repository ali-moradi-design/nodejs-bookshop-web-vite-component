import { useMemo } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { getRoleNames, type User } from '@/types/auth';
import { useUsersQuery } from '@/hooks';
import { DataTable } from '@/components/DataTable';
import { ApiError } from '@/services/http';
import { Alert } from '@/components/Alert';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { PageLoader } from '@/components/Spinner';
import { useToggleUserActiveMutation } from '@/hooks';
import { useDeleteUserMutation } from '@/hooks';

export function AdminUsersPanel() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useUsersQuery();
  const toggleActive = useToggleUserActiveMutation();
  const remove = useDeleteUserMutation();

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      {
        id: 'roles',
        header: 'Roles',
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {getRoleNames(row.original).map((r) => (
              <Badge key={r} variant="secondary">
                {r}
              </Badge>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'isActive',
        header: 'Active',
        cell: ({ row }) => (
          <Badge variant={row.original.isActive ? 'success' : 'outline'}>
            {row.original.isActive ? 'yes' : 'no'}
          </Badge>
        ),
      },
      {
        id: 'actions',
        header: t('common.actions'),
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => toggleActive.mutate(row.original)}>
              Toggle
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                if (confirm('Delete user?')) remove.mutate(row.original.id);
              }}
            >
              {t('common.delete')}
            </Button>
          </div>
        ),
      },
    ],
    [t, toggleActive, remove],
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
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
}
