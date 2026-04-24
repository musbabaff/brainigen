import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import { Flag } from 'lucide-react';

type FlaggedConv = {
  id: string;
  agent_id: string;
  user_id: string;
  status: string | null;
  created_at: string;
  agents: { name: string } | null;
  profiles: { full_name: string | null; email: string } | null;
};

export default async function FlaggedConversationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('conversations')
    .select('id, agent_id, user_id, status, created_at, agents(name), profiles(full_name, email)')
    .eq('flagged', true)
    .order('created_at', { ascending: false });

  const columns: Column<FlaggedConv>[] = [
    {
      key: 'agent_id',
      label: 'Agent',
      render: (c) => <div className="font-medium text-sm">{c.agents?.name ?? 'Unknown'}</div>,
    },
    {
      key: 'user_id',
      label: 'User',
      render: (c) => (
        <div>
          <div className="text-sm">{c.profiles?.full_name ?? 'Unknown'}</div>
          <div className="text-xs text-muted">{c.profiles?.email}</div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (c) => (
        <span className="text-[10px] px-2 py-0.5 rounded uppercase bg-red-500/10 text-red-500 font-medium tracking-wider">
          Flagged
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Flagged',
      sortable: true,
      render: (c) => <span className="text-xs text-muted">{formatDistanceToNow(c.created_at)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
          <Flag className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h1 className="text-h2">Flagged Messages</h1>
          <p className="text-muted text-sm">{data?.length ?? 0} conversations requiring review</p>
        </div>
      </div>
      <DataTable
        data={(data as unknown as FlaggedConv[]) ?? []}
        columns={columns}
        searchKeys={['agent_id']}
        exportFilename="flagged-conversations"
        emptyTitle="No flagged messages"
        emptyDescription="Conversations flagged for harmful content will appear here"
      />
    </div>
  );
}
