import { createClient } from '@/lib/supabase/server';
import { TicketsKanban } from '@/components/admin/support/tickets-kanban';
import { Ticket } from 'lucide-react';

export default async function TicketsPage() {
  const supabase = await createClient();
  const { data: tickets } = await supabase
    .from('tickets')
    .select('id, subject, status, priority, created_at, user_id, profiles(full_name, email)')
    .order('created_at', { ascending: false });

  const open = tickets?.filter(t => t.status === 'open').length ?? 0;
  const inProgress = tickets?.filter(t => t.status === 'in_progress').length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center">
            <Ticket className="w-5 h-5 text-brand" />
          </div>
          <div>
            <h1 className="text-h2">Support Tickets</h1>
            <p className="text-muted text-sm">{open} open · {inProgress} in progress</p>
          </div>
        </div>
      </div>
      <TicketsKanban tickets={(tickets as never) ?? []} />
    </div>
  );
}
