import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import { Receipt } from 'lucide-react';

type Invoice = { id: string; user_id: string; amount: number; status: string; created_at: string; profiles: { full_name: string | null; email: string } | null };

export default async function InvoicesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('invoices').select('id, user_id, amount, status, created_at, profiles(full_name, email)').order('created_at', { ascending: false });

  const totalRevenue = data?.filter(i => i.status === 'paid').reduce((s, i) => s + Number(i.amount), 0) ?? 0;
  const STATUS_STYLES: Record<string, string> = { paid: 'bg-green-500/10 text-green-500', pending: 'bg-amber-500/10 text-amber-500', failed: 'bg-red-500/10 text-red-500', refunded: 'bg-purple-500/10 text-purple-500' };

  const columns: Column<Invoice>[] = [
    { key: 'user_id', label: 'Customer', render: (i) => (<div><div className="font-medium text-sm">{i.profiles?.full_name ?? 'Unknown'}</div><div className="text-xs text-muted">{i.profiles?.email}</div></div>) },
    { key: 'amount', label: 'Amount', sortable: true, render: (i) => <span className="font-medium text-sm">${Number(i.amount).toFixed(2)}</span> },
    { key: 'status', label: 'Status', render: (i) => <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${STATUS_STYLES[i.status] ?? STATUS_STYLES.pending}`}>{i.status}</span> },
    { key: 'created_at', label: 'Date', sortable: true, render: (i) => <span className="text-xs text-muted">{formatDistanceToNow(i.created_at)}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Receipt className="w-5 h-5 text-brand" /></div>
          <div><h1 className="text-h2">Invoices</h1><p className="text-muted text-sm">${totalRevenue.toFixed(2)} total revenue · {data?.length ?? 0} invoices</p></div>
        </div>
      </div>
      <DataTable data={(data as unknown as Invoice[]) ?? []} columns={columns} searchKeys={['user_id']} exportFilename="invoices" emptyTitle="No invoices" emptyDescription="Invoices appear here after successful charges" />
    </div>
  );
}
