import { createClient } from '@/lib/supabase/server';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import { Mail } from 'lucide-react';

type Contact = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string | null;
  message: string | null;
  status: string | null;
  created_at: string;
};

export default async function ContactSubmissionsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('contact_submissions')
    .select('id, name, email, company, subject, message, status, created_at')
    .order('created_at', { ascending: false });

  const columns: Column<Contact>[] = [
    {
      key: 'name',
      label: 'From',
      render: (c) => (
        <div>
          <div className="font-medium text-sm">{c.name}</div>
          <div className="text-xs text-muted">{c.email}</div>
        </div>
      ),
    },
    { key: 'company', label: 'Company', render: (c) => <span className="text-sm text-muted">{c.company || '—'}</span> },
    { key: 'subject', label: 'Subject', render: (c) => <span className="text-sm">{c.subject || '—'}</span> },
    {
      key: 'status',
      label: 'Status',
      render: (c) => {
        const s = c.status ?? 'new';
        const styles: Record<string, string> = { new: 'bg-brand-soft text-brand', contacted: 'bg-green-500/10 text-green-500', closed: 'bg-surface-2 text-muted' };
        return <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${styles[s] ?? styles.new}`}>{s}</span>;
      },
    },
    { key: 'created_at', label: 'Received', sortable: true, render: (c) => <span className="text-xs text-muted">{formatDistanceToNow(c.created_at)}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center">
          <Mail className="w-5 h-5 text-brand" />
        </div>
        <div>
          <h1 className="text-h2">Contact Submissions</h1>
          <p className="text-muted text-sm">{data?.length ?? 0} total submissions</p>
        </div>
      </div>
      <DataTable data={data ?? []} columns={columns} searchKeys={['name', 'email', 'subject']} exportFilename="contacts" emptyTitle="No submissions" emptyDescription="Contact form submissions will appear here" />
    </div>
  );
}
