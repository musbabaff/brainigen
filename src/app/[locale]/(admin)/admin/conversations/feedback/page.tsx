import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';

type Feedback = {
  id: string;
  conversation_id: string;
  user_id: string;
  rating: string;
  comment: string | null;
  created_at: string;
  profiles: { full_name: string | null; email: string } | null;
};

export default async function FeedbackPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('conversation_feedback')
    .select('id, conversation_id, user_id, rating, comment, created_at, profiles(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(500);

  const thumbsUp = data?.filter(f => f.rating === 'positive').length ?? 0;
  const thumbsDown = data?.filter(f => f.rating === 'negative').length ?? 0;

  const columns: Column<Feedback>[] = [
    {
      key: 'rating',
      label: 'Rating',
      render: (f) => f.rating === 'positive'
        ? <ThumbsUp className="w-4 h-4 text-green-500" />
        : <ThumbsDown className="w-4 h-4 text-red-500" />,
    },
    {
      key: 'user_id',
      label: 'User',
      render: (f) => (
        <div>
          <div className="text-sm">{f.profiles?.full_name ?? 'Unknown'}</div>
          <div className="text-xs text-muted">{f.profiles?.email}</div>
        </div>
      ),
    },
    {
      key: 'comment',
      label: 'Comment',
      render: (f) => (
        <span className="text-sm text-muted truncate max-w-xs block">{f.comment || '—'}</span>
      ),
    },
    {
      key: 'created_at',
      label: 'Submitted',
      sortable: true,
      render: (f) => <span className="text-xs text-muted">{formatDistanceToNow(f.created_at)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center">
          <Star className="w-5 h-5 text-brand" />
        </div>
        <div>
          <h1 className="text-h2">User Feedback</h1>
          <p className="text-muted text-sm">{data?.length ?? 0} total ratings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Feedback', value: data?.length ?? 0, icon: Star, color: 'text-brand' },
          { label: 'Positive', value: thumbsUp, icon: ThumbsUp, color: 'text-green-500' },
          { label: 'Negative', value: thumbsDown, icon: ThumbsDown, color: 'text-red-500' },
        ].map(stat => (
          <div key={stat.label} className="p-5 rounded-xl border border-border bg-surface flex items-center gap-4">
            <stat.icon className={`w-8 h-8 ${stat.color} opacity-70`} />
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <DataTable
        data={(data as unknown as Feedback[]) ?? []}
        columns={columns}
        searchKeys={['user_id']}
        exportFilename="feedback"
        emptyTitle="No feedback yet"
        emptyDescription="Feedback appears here when users rate conversations"
      />
    </div>
  );
}
