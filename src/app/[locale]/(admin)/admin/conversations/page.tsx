import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import { MessageSquare } from 'lucide-react';

type Conversation = {
  id: string;
  agent_id: string;
  user_id: string;
  message_count: number | null;
  status: string | null;
  created_at: string;
  agents: { name: string; type: string } | null;
  profiles: { full_name: string | null; email: string } | null;
};

export default async function ConversationsPage() {
  const supabase = await createClient();
  const { data: conversations } = await supabase
    .from('conversations')
    .select('id, agent_id, user_id, message_count, status, created_at, agents(name, type), profiles(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(500);

  const columns: Column<Conversation>[] = [
    {
      key: 'agent_id',
      label: 'Agent',
      render: (c) => (
        <div>
          <div className="font-medium text-sm">{c.agents?.name ?? 'Unknown'}</div>
          <div className="text-xs text-muted">{c.agents?.type}</div>
        </div>
      ),
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
      key: 'message_count',
      label: 'Messages',
      sortable: true,
      render: (c) => <span className="text-sm">{c.message_count ?? 0}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (c) => {
        const s = c.status ?? 'active';
        const styles: Record<string, string> = {
          active: 'bg-green-500/10 text-green-500',
          completed: 'bg-blue-500/10 text-blue-500',
          abandoned: 'bg-surface-2 text-muted',
        };
        return (
          <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${styles[s] ?? styles.active}`}>
            {s}
          </span>
        );
      },
    },
    {
      key: 'created_at',
      label: 'Started',
      sortable: true,
      render: (c) => <span className="text-xs text-muted">{formatDistanceToNow(c.created_at)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-brand" />
        </div>
        <div>
          <h1 className="text-h2">All Conversations</h1>
          <p className="text-muted text-sm">{conversations?.length ?? 0} conversations across all agents</p>
        </div>
      </div>
      <DataTable
        data={(conversations as unknown as Conversation[]) ?? []}
        columns={columns}
        searchKeys={['agent_id', 'user_id']}
        exportFilename="conversations"
        emptyTitle="No conversations yet"
        emptyDescription="Conversations will appear here when users interact with agents"
      />
    </div>
  );
}
