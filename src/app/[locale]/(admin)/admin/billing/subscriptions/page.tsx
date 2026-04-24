import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import { CreditCard } from 'lucide-react';
import { PlanBadge } from '@/components/admin/users/plan-badge';

type Subscription = { id: string; user_id: string; plan: string; status: string; amount: number | null; current_period_end: string | null; created_at: string; profiles: { full_name: string | null; email: string } | null };

export default async function SubscriptionsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('subscriptions').select('id, user_id, plan, status, amount, current_period_end, created_at, profiles(full_name, email)').order('created_at', { ascending: false });

  const active = data?.filter(s => s.status === 'active') ?? [];
  const mrr = active.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);

  const STATUS_STYLES: Record<string, string> = { active: 'bg-green-500/10 text-green-500', trialing: 'bg-brand-soft text-brand', canceled: 'bg-surface-2 text-muted', past_due: 'bg-red-500/10 text-red-500' };
  const columns: Column<Subscription>[] = [
    {
      key: 'user_id', label: 'Customer',
      render: (s) => (
        <div>
          <div className="font-medium text-sm">{s.profiles?.full_name ?? 'Unknown'}</div>
          <div className="text-xs text-muted">{s.profiles?.email}</div>
        </div>
      ),
    },
    { key: 'plan', label: 'Plan', render: (s) => <PlanBadge plan={s.plan} /> },
    { key: 'amount', label: 'MRR', sortable: true, render: (s) => <span className="text-sm font-medium">${Number(s.amount ?? 0).toFixed(2)}</span> },
    { key: 'status', label: 'Status', render: (s) => <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${STATUS_STYLES[s.status] ?? STATUS_STYLES.active}`}>{s.status}</span> },
    { key: 'current_period_end', label: 'Renewal', render: (s) => <span className="text-xs text-muted">{s.current_period_end ? new Date(s.current_period_end).toLocaleDateString() : '—'}</span> },
    { key: 'created_at', label: 'Started', sortable: true, render: (s) => <span className="text-xs text-muted">{formatDistanceToNow(s.created_at)}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><CreditCard className="w-5 h-5 text-brand" /></div>
        <div><h1 className="text-h2">Subscriptions</h1><p className="text-muted text-sm">{active.length} active · ${mrr.toFixed(2)} MRR</p></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total MRR', value: `$${mrr.toFixed(2)}` },
          { label: 'Active', value: active.length },
          { label: 'Trialing', value: data?.filter(s => s.status === 'trialing').length ?? 0 },
          { label: 'Canceled', value: data?.filter(s => s.status === 'canceled').length ?? 0 },
        ].map(stat => (
          <div key={stat.label} className="p-4 rounded-xl border border-border bg-surface">
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
      <DataTable data={(data as unknown as Subscription[]) ?? []} columns={columns} searchKeys={['user_id']} exportFilename="subscriptions" emptyTitle="No subscriptions" emptyDescription="Subscriptions appear here when users upgrade" />
    </div>
  );
}
