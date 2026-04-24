import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import { MessageCircle } from 'lucide-react';

type Comment = { id: string; content: string; status: string; author_name: string | null; author_email: string | null; post_id: string | null; created_at: string };

export default async function CommentsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('blog_comments')
    .select('id, content, status, author_name, author_email, post_id, created_at')
    .order('created_at', { ascending: false });

  const columns: Column<Comment>[] = [
    {
      key: 'content', label: 'Comment',
      render: (c) => <div className="text-sm max-w-sm truncate text-muted">{c.content}</div>,
    },
    {
      key: 'author_name', label: 'Author',
      render: (c) => (
        <div>
          <div className="text-sm">{c.author_name ?? 'Anonymous'}</div>
          <div className="text-xs text-muted">{c.author_email}</div>
        </div>
      ),
    },
    {
      key: 'status', label: 'Status',
      render: (c) => {
        const styles: Record<string, string> = { pending: 'bg-amber-500/10 text-amber-500', approved: 'bg-green-500/10 text-green-500', rejected: 'bg-red-500/10 text-red-500', spam: 'bg-surface-2 text-muted' };
        return <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${styles[c.status] ?? styles.pending}`}>{c.status}</span>;
      },
    },
    { key: 'created_at', label: 'Submitted', sortable: true, render: (c) => <span className="text-xs text-muted">{formatDistanceToNow(c.created_at)}</span> },
  ];

  const pending = data?.filter(c => c.status === 'pending').length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><MessageCircle className="w-5 h-5 text-brand" /></div>
        <div><h1 className="text-h2">Blog Comments</h1><p className="text-muted text-sm">{pending} pending moderation · {data?.length ?? 0} total</p></div>
      </div>
      <DataTable data={data ?? []} columns={columns} searchKeys={['author_name', 'author_email', 'content']} exportFilename="comments" emptyTitle="No comments" emptyDescription="Blog comments will appear here" />
    </div>
  );
}
