import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import Link from 'next/link';
import { BookOpen, Plus } from 'lucide-react';

type Article = { id: string; title: string; category: string; status: string; views: number; created_at: string };

export default async function KBPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('kb_articles').select('id, title, category, status, views, created_at').order('created_at', { ascending: false });

  const columns: Column<Article>[] = [
    { key: 'title', label: 'Title', render: (a) => <div className="font-medium text-sm">{a.title}</div> },
    { key: 'category', label: 'Category', render: (a) => <span className="text-xs text-muted capitalize">{a.category}</span> },
    {
      key: 'status', label: 'Status',
      render: (a) => <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${a.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-surface-2 text-muted'}`}>{a.status}</span>,
    },
    { key: 'views', label: 'Views', sortable: true, render: (a) => <span className="text-sm">{a.views ?? 0}</span> },
    { key: 'created_at', label: 'Created', sortable: true, render: (a) => <span className="text-xs text-muted">{formatDistanceToNow(a.created_at)}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><BookOpen className="w-5 h-5 text-brand" /></div>
          <div><h1 className="text-h2">Help Center</h1><p className="text-muted text-sm">{data?.length ?? 0} articles</p></div>
        </div>
        <Link href="/admin/support/kb/new" className="inline-flex items-center gap-2 h-9 px-4 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors">
          <Plus className="w-4 h-4" />New Article
        </Link>
      </div>
      <DataTable data={data ?? []} columns={columns} searchKeys={['title', 'category']} exportFilename="kb-articles" emptyTitle="No articles yet" emptyDescription="Create your first help center article" />
    </div>
  );
}
