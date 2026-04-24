import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import { Users } from 'lucide-react';

type Subscriber = { id: string; email: string; status: string; source: string | null; created_at: string };

export default async function NewsletterPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('newsletter_subscribers').select('id, email, status, source, created_at').order('created_at', { ascending: false });

  const STATUS_STYLES: Record<string, string> = { active: 'bg-green-500/10 text-green-500', unsubscribed: 'bg-surface-2 text-muted', bounced: 'bg-red-500/10 text-red-500' };
  const columns: Column<Subscriber>[] = [
    { key: 'email', label: 'Email' },
    { key: 'source', label: 'Source', render: (s) => <span className="text-xs text-muted capitalize">{s.source ?? 'direct'}</span> },
    { key: 'status', label: 'Status', render: (s) => <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${STATUS_STYLES[s.status] ?? STATUS_STYLES.active}`}>{s.status}</span> },
    { key: 'created_at', label: 'Subscribed', sortable: true, render: (s) => <span className="text-xs text-muted">{formatDistanceToNow(s.created_at)}</span> },
  ];

  const active = data?.filter(s => s.status === 'active').length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Users className="w-5 h-5 text-brand" /></div>
        <div><h1 className="text-h2">Newsletter Subscribers</h1><p className="text-muted text-sm">{active} active of {data?.length ?? 0} total</p></div>
      </div>
      <DataTable data={data ?? []} columns={columns} searchKeys={['email']} exportFilename="subscribers" emptyTitle="No subscribers yet" emptyDescription="Newsletter subscribers will appear here" />
    </div>
  );
}
