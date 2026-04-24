import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import Link from 'next/link';
import { Send, Plus } from 'lucide-react';

type Campaign = { id: string; name: string; subject: string; status: string; recipients_count: number; open_count: number; click_count: number; sent_at: string | null; created_at: string };

export default async function CampaignsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('email_campaigns').select('id, name, subject, status, recipients_count, open_count, click_count, sent_at, created_at').order('created_at', { ascending: false });

  const STATUS_STYLES: Record<string, string> = { draft: 'bg-surface-2 text-muted', scheduled: 'bg-amber-500/10 text-amber-500', sent: 'bg-green-500/10 text-green-500', failed: 'bg-red-500/10 text-red-500', sending: 'bg-brand-soft text-brand' };
  const columns: Column<Campaign>[] = [
    { key: 'name', label: 'Campaign', render: (c) => <div className="font-medium text-sm">{c.name}</div> },
    { key: 'subject', label: 'Subject', render: (c) => <div className="text-sm text-muted truncate max-w-xs">{c.subject}</div> },
    { key: 'status', label: 'Status', render: (c) => <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${STATUS_STYLES[c.status] ?? STATUS_STYLES.draft}`}>{c.status}</span> },
    { key: 'recipients_count', label: 'Recipients', sortable: true, render: (c) => <span className="text-sm">{c.recipients_count}</span> },
    { key: 'open_count', label: 'Open Rate', render: (c) => <span className="text-sm">{c.recipients_count > 0 ? `${Math.round((c.open_count / c.recipients_count) * 100)}%` : '—'}</span> },
    { key: 'created_at', label: 'Created', sortable: true, render: (c) => <span className="text-xs text-muted">{formatDistanceToNow(c.created_at)}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Send className="w-5 h-5 text-brand" /></div>
          <div><h1 className="text-h2">Email Campaigns</h1><p className="text-muted text-sm">{data?.length ?? 0} campaigns</p></div>
        </div>
        <Link href="/admin/marketing/campaigns/new" className="inline-flex items-center gap-2 h-9 px-4 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors">
          <Plus className="w-4 h-4" />New Campaign
        </Link>
      </div>
      <DataTable data={data ?? []} columns={columns} searchKeys={['name', 'subject']} exportFilename="campaigns" emptyTitle="No campaigns yet" emptyDescription="Create your first email campaign" />
    </div>
  );
}
