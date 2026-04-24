'use client';

import Link from 'next/link';
import { DataTable, type Column } from '@/components/admin/data-table';
import { RoleBadge } from './role-badge';
import { PlanBadge } from './plan-badge';
import { formatDistanceToNow } from '@/lib/date-utils';

export type AdminUser = {
  id: string;
  full_name: string | null;
  email: string;
  avatar_url: string | null;
  role: string;
  plan: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  mfa_enabled: boolean | null;
  banned: boolean | null;
};

export function UsersTable({ users }: { users: AdminUser[] }) {
  const columns: Column<AdminUser>[] = [
    {
      key: 'full_name',
      label: 'User',
      render: (user) => (
        <Link href={`/admin/users/${user.id}`} className="flex items-center gap-3 hover:opacity-80" onClick={(e) => e.stopPropagation()}>
          <div className="w-8 h-8 rounded-full bg-brand-soft flex items-center justify-center text-brand text-xs font-semibold shrink-0">
            {user.full_name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <div className="font-medium truncate">{user.full_name || 'Unnamed'}</div>
            <div className="text-xs text-muted truncate">{user.email}</div>
          </div>
        </Link>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (user) => <RoleBadge role={user.role} />,
    },
    {
      key: 'plan',
      label: 'Plan',
      render: (user) => <PlanBadge plan={user.plan || 'free'} />,
    },
    {
      key: 'last_sign_in_at',
      label: 'Last Active',
      sortable: true,
      render: (user) => (
        <span className="text-muted text-xs">
          {user.last_sign_in_at ? formatDistanceToNow(user.last_sign_in_at) : 'Never'}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Joined',
      sortable: true,
      render: (user) => (
        <span className="text-muted text-xs">{formatDistanceToNow(user.created_at)}</span>
      ),
    },
    {
      key: 'banned',
      label: 'Status',
      render: (user) => (
        <div className="flex items-center gap-1.5">
          <span className={`inline-block w-2 h-2 rounded-full ${user.banned ? 'bg-red-500' : 'bg-green-500'}`} />
          <span className="text-xs text-muted">{user.banned ? 'Banned' : 'Active'}</span>
          {user.mfa_enabled && (
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-brand-soft text-brand uppercase">2FA</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      searchKeys={['full_name', 'email']}
      exportFilename="users"
      emptyTitle="No users yet"
      emptyDescription="Users will appear here once they sign up"
    />
  );
}
