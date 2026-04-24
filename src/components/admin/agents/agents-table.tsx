'use client';

import Link from 'next/link';
import { Bot } from 'lucide-react';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';

export type AdminAgent = {
  id: string;
  name: string;
  type: string;
  status: string;
  created_at: string;
  user_id: string;
  profiles: { full_name: string | null; email: string } | null;
};

const TYPE_STYLES: Record<string, string> = {
  chatbot: 'bg-blue-500/10 text-blue-500',
  assistant: 'bg-purple-500/10 text-purple-500',
  automation: 'bg-amber-500/10 text-amber-500',
  voice: 'bg-green-500/10 text-green-500',
  custom: 'bg-surface-2 text-muted',
};

export function AgentsTable({ agents }: { agents: AdminAgent[] }) {
  const columns: Column<AdminAgent>[] = [
    {
      key: 'name',
      label: 'Agent',
      render: (a) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-brand-soft flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4 text-brand" />
          </div>
          <div className="font-medium truncate">{a.name}</div>
        </div>
      ),
    },
    {
      key: 'user_id',
      label: 'Owner',
      render: (a) => (
        <Link href={`/admin/users/${a.user_id}`} className="text-sm hover:text-brand transition-colors" onClick={(e) => e.stopPropagation()}>
          <div>{a.profiles?.full_name || 'Unknown'}</div>
          <div className="text-xs text-muted">{a.profiles?.email}</div>
        </Link>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (a) => {
        const style = TYPE_STYLES[a.type] || TYPE_STYLES.custom;
        return (
          <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${style}`}>
            {a.type}
          </span>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (a) => (
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full shrink-0 ${
            a.status === 'active' ? 'bg-green-500' : a.status === 'paused' ? 'bg-amber-500' : 'bg-muted'
          }`} />
          <span className="text-xs text-muted capitalize">{a.status}</span>
        </div>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (a) => <span className="text-xs text-muted">{formatDistanceToNow(a.created_at)}</span>,
    },
  ];

  return (
    <DataTable
      data={agents}
      columns={columns}
      searchKeys={['name']}
      exportFilename="agents"
      emptyTitle="No agents yet"
      emptyDescription="Agents appear here once users create them"
    />
  );
}
