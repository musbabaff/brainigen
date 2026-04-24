import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import Link from 'next/link';
import { FileText, Plus } from 'lucide-react';

type Post = { id: string; title: string; status: string; category: string | null; views: number | null; created_at: string; author_id: string | null };

export default async function BlogPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, status, category, views, created_at, author_id')
    .order('created_at', { ascending: false });

  const columns: Column<Post>[] = [
    { key: 'title', label: 'Title', render: (p) => <div className="font-medium text-sm max-w-xs truncate">{p.title}</div> },
    { key: 'category', label: 'Category', render: (p) => <span className="text-xs text-muted capitalize">{p.category || '—'}</span> },
    {
      key: 'status', label: 'Status',
      render: (p) => {
        const styles: Record<string, string> = { published: 'bg-green-500/10 text-green-500', draft: 'bg-surface-2 text-muted', scheduled: 'bg-amber-500/10 text-amber-500', archived: 'bg-red-500/10 text-red-500' };
        return <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${styles[p.status] ?? styles.draft}`}>{p.status}</span>;
      },
    },
    { key: 'views', label: 'Views', sortable: true, render: (p) => <span className="text-sm">{p.views ?? 0}</span> },
    { key: 'created_at', label: 'Created', sortable: true, render: (p) => <span className="text-xs text-muted">{formatDistanceToNow(p.created_at)}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><FileText className="w-5 h-5 text-brand" /></div>
          <div><h1 className="text-h2">Blog Posts</h1><p className="text-muted text-sm">{data?.length ?? 0} posts</p></div>
        </div>
        <Link href="/admin/content/blog/new" className="inline-flex items-center gap-2 h-9 px-4 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors">
          <Plus className="w-4 h-4" />New Post
        </Link>
      </div>
      <DataTable data={data ?? []} columns={columns} searchKeys={['title', 'category']} exportFilename="blog-posts" emptyTitle="No posts yet" emptyDescription="Create your first blog post" />
    </div>
  );
}
