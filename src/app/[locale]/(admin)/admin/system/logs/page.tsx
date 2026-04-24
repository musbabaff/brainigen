import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import { Terminal } from 'lucide-react';

type LogRow = { id: string; level: string; source: string | null; message: string; created_at: string };

export default async function SystemLogsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('system_logs').select('id, level, source, message, created_at').order('created_at', { ascending: false }).limit(500);

  const LEVEL_STYLES: Record<string, string> = {
    error: 'bg-red-500/10 text-red-500',
    warn: 'bg-amber-500/10 text-amber-500',
    info: 'bg-blue-500/10 text-blue-500',
    debug: 'bg-surface-2 text-muted',
  };

  const columns: Column<LogRow>[] = [
    { key: 'level', label: 'Level', width: '80px', render: (l) => <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${LEVEL_STYLES[l.level] ?? LEVEL_STYLES.info}`}>{l.level}</span> },
    { key: 'source', label: 'Source', render: (l) => <span className="font-mono text-xs text-muted">{l.source ?? '—'}</span> },
    { key: 'message', label: 'Message', render: (l) => <span className="text-sm truncate max-w-xl block">{l.message}</span> },
    { key: 'created_at', label: 'Time', sortable: true, render: (l) => <span className="text-xs text-muted whitespace-nowrap">{formatDistanceToNow(l.created_at)}</span> },
  ];

  const errors = data?.filter(l => l.level === 'error').length ?? 0;
  const warns = data?.filter(l => l.level === 'warn').length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center"><Terminal className="w-5 h-5 text-muted" /></div>
        <div><h1 className="text-h2">System Logs</h1><p className="text-muted text-sm">{errors} errors · {warns} warnings in last 500 entries</p></div>
      </div>
      <DataTable data={data ?? []} columns={columns} searchKeys={['message', 'source']} exportFilename="system-logs" emptyTitle="No logs" emptyDescription="System logs will appear here as your application runs" />
    </div>
  );
}
