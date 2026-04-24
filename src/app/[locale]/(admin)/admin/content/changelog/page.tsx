import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import Link from 'next/link';
import { Megaphone, Plus } from 'lucide-react';

type ChangelogEntry = { id: string; title: string; version: string | null; category: string; status: string; created_at: string };

export default async function ChangelogPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('changelog_entries').select('id, title, version, category, status, created_at').order('created_at', { ascending: false });

  const CATEGORY_STYLES: Record<string, string> = {
    feature: 'bg-brand-soft text-brand',
    improvement: 'bg-blue-500/10 text-blue-500',
    fix: 'bg-amber-500/10 text-amber-500',
  };

  const columns: Column<ChangelogEntry>[] = [
    { key: 'version', label: 'Version', render: (e) => <span className="font-mono text-sm">{e.version ?? '—'}</span> },
    { key: 'title', label: 'Title', render: (e) => <div className="font-medium text-sm">{e.title}</div> },
    { key: 'category', label: 'Type', render: (e) => <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${CATEGORY_STYLES[e.category] ?? 'bg-surface-2 text-muted'}`}>{e.category}</span> },
    { key: 'status', label: 'Status', render: (e) => <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${e.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-surface-2 text-muted'}`}>{e.status}</span> },
    { key: 'created_at', label: 'Date', sortable: true, render: (e) => <span className="text-xs text-muted">{formatDistanceToNow(e.created_at)}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Megaphone className="w-5 h-5 text-brand" /></div>
          <div><h1 className="text-h2">Changelog</h1><p className="text-muted text-sm">{data?.length ?? 0} entries</p></div>
        </div>
        <Link href="/admin/content/changelog/new" className="inline-flex items-center gap-2 h-9 px-4 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors">
          <Plus className="w-4 h-4" />New Entry
        </Link>
      </div>
      <DataTable data={data ?? []} columns={columns} searchKeys={['title', 'version']} exportFilename="changelog" emptyTitle="No entries yet" emptyDescription="Create your first changelog entry" />
    </div>
  );
}
