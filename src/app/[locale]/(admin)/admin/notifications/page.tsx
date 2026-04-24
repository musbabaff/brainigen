import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import { Bell } from 'lucide-react';

type Notification = { id: string; type: string; title: string; message: string | null; entity_type: string | null; created_at: string };

const TYPE_STYLES: Record<string, string> = {
  new_user: 'bg-brand-soft text-brand',
  payment_failed: 'bg-red-500/10 text-red-500',
  new_ticket: 'bg-amber-500/10 text-amber-500',
  system_error: 'bg-red-500/10 text-red-500',
  security_event: 'bg-purple-500/10 text-purple-500',
};

export default async function NotificationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('admin_notifications')
    .select('id, type, title, message, entity_type, created_at')
    .order('created_at', { ascending: false })
    .limit(200);

  const columns: Column<Notification>[] = [
    {
      key: 'type', label: 'Type',
      render: (n) => <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${TYPE_STYLES[n.type] ?? 'bg-surface-2 text-muted'}`}>{n.type.replace('_', ' ')}</span>,
    },
    { key: 'title', label: 'Title', render: (n) => <div className="font-medium text-sm">{n.title}</div> },
    { key: 'message', label: 'Message', render: (n) => <div className="text-sm text-muted truncate max-w-sm">{n.message ?? '—'}</div> },
    { key: 'entity_type', label: 'Entity', render: (n) => <span className="text-xs text-muted capitalize">{n.entity_type ?? '—'}</span> },
    { key: 'created_at', label: 'Time', sortable: true, render: (n) => <span className="text-xs text-muted whitespace-nowrap">{formatDistanceToNow(n.created_at)}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Bell className="w-5 h-5 text-brand" /></div>
        <div><h1 className="text-h2">Admin Notifications</h1><p className="text-muted text-sm">{data?.length ?? 0} recent notifications</p></div>
      </div>
      <DataTable data={data ?? []} columns={columns} searchKeys={['title', 'message']} exportFilename="notifications" emptyTitle="No notifications" emptyDescription="Admin notifications will appear here" />
    </div>
  );
}
