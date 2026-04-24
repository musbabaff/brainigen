import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import { Webhook } from 'lucide-react';

type WebhookRow = { id: string; url: string; events: string[]; status: string; user_id: string; created_at: string; profiles: { full_name: string | null; email: string } | null };

export default async function WebhooksPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('webhooks')
    .select('id, url, events, status, user_id, created_at, profiles(full_name, email)')
    .order('created_at', { ascending: false });

  const columns: Column<WebhookRow>[] = [
    { key: 'url', label: 'Endpoint', render: (w) => <span className="font-mono text-xs truncate max-w-xs block">{w.url}</span> },
    { key: 'user_id', label: 'Owner', render: (w) => (<div><div className="text-sm">{w.profiles?.full_name ?? 'Unknown'}</div><div className="text-xs text-muted">{w.profiles?.email}</div></div>) },
    { key: 'events', label: 'Events', render: (w) => <span className="text-xs text-muted">{Array.isArray(w.events) ? w.events.slice(0, 2).join(', ') + (w.events.length > 2 ? ` +${w.events.length - 2}` : '') : '—'}</span> },
    { key: 'status', label: 'Status', render: (w) => <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${w.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-surface-2 text-muted'}`}>{w.status}</span> },
    { key: 'created_at', label: 'Created', sortable: true, render: (w) => <span className="text-xs text-muted">{formatDistanceToNow(w.created_at)}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Webhook className="w-5 h-5 text-brand" /></div>
        <div><h1 className="text-h2">Webhooks</h1><p className="text-muted text-sm">{data?.length ?? 0} webhooks registered</p></div>
      </div>
      <DataTable data={(data as unknown as WebhookRow[]) ?? []} columns={columns} searchKeys={['url']} exportFilename="webhooks" emptyTitle="No webhooks" emptyDescription="Webhooks appear here when users register endpoints" />
    </div>
  );
}
