import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import { Key } from 'lucide-react';

type ApiKey = { id: string; name: string; user_id: string; key_preview: string | null; usage_count: number | null; last_used_at: string | null; status: string; created_at: string; profiles: { full_name: string | null; email: string } | null };

export default async function ApiKeysPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('api_keys')
    .select('id, name, user_id, key_preview, usage_count, last_used_at, status, created_at, profiles(full_name, email)')
    .order('created_at', { ascending: false });

  const columns: Column<ApiKey>[] = [
    { key: 'name', label: 'Name', render: (k) => <div className="font-medium text-sm">{k.name}</div> },
    { key: 'user_id', label: 'Owner', render: (k) => (<div><div className="text-sm">{k.profiles?.full_name ?? 'Unknown'}</div><div className="text-xs text-muted">{k.profiles?.email}</div></div>) },
    { key: 'key_preview', label: 'Key', render: (k) => <span className="font-mono text-xs text-muted">{k.key_preview ?? '••••••••••••'}</span> },
    { key: 'usage_count', label: 'Requests', sortable: true, render: (k) => <span className="text-sm">{k.usage_count ?? 0}</span> },
    { key: 'last_used_at', label: 'Last Used', render: (k) => <span className="text-xs text-muted">{k.last_used_at ? formatDistanceToNow(k.last_used_at) : 'Never'}</span> },
    { key: 'status', label: 'Status', render: (k) => <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${k.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{k.status}</span> },
    { key: 'created_at', label: 'Created', sortable: true, render: (k) => <span className="text-xs text-muted">{formatDistanceToNow(k.created_at)}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Key className="w-5 h-5 text-brand" /></div>
        <div><h1 className="text-h2">API Keys</h1><p className="text-muted text-sm">{data?.length ?? 0} keys across all users</p></div>
      </div>
      <DataTable data={(data as unknown as ApiKey[]) ?? []} columns={columns} searchKeys={['name']} exportFilename="api-keys" emptyTitle="No API keys" emptyDescription="API keys appear here when users create them" />
    </div>
  );
}
