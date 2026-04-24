'use client';

import { useState } from 'react';
import { formatDistanceToNow } from '@/lib/date-utils';
import { cn } from '@/lib/utils';

type Ticket = {
  id: string;
  subject: string;
  status: string;
  priority: string;
  created_at: string;
  user_id: string | null;
  profiles: { full_name: string | null; email: string } | null;
};

const COLUMNS = [
  { id: 'open', label: 'Open', color: 'bg-blue-500' },
  { id: 'in_progress', label: 'In Progress', color: 'bg-amber-500' },
  { id: 'waiting', label: 'Waiting', color: 'bg-purple-500' },
  { id: 'closed', label: 'Closed', color: 'bg-green-500' },
];

const PRIORITY_STYLES: Record<string, string> = {
  low: 'bg-surface-2 text-muted',
  medium: 'bg-blue-500/10 text-blue-500',
  high: 'bg-amber-500/10 text-amber-500',
  urgent: 'bg-red-500/10 text-red-500',
};

function TicketCard({ ticket, onMove }: { ticket: Ticket; onMove: (id: string, status: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-3 rounded-lg border border-border bg-surface hover:border-brand/40 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="text-sm font-medium leading-snug flex-1">{ticket.subject}</div>
        <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-medium shrink-0 ${PRIORITY_STYLES[ticket.priority] ?? PRIORITY_STYLES.medium}`}>
          {ticket.priority}
        </span>
      </div>
      <div className="text-xs text-muted mb-3">
        {ticket.profiles?.full_name ?? ticket.profiles?.email ?? 'Unknown'} · {formatDistanceToNow(ticket.created_at)}
      </div>
      <div className="flex flex-wrap gap-1">
        {COLUMNS.filter(c => c.id !== ticket.status).map(col => (
          <button
            key={col.id}
            onClick={() => onMove(ticket.id, col.id)}
            className="text-[10px] px-2 py-0.5 rounded border border-border hover:bg-surface-2 text-muted transition-colors"
          >
            → {col.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TicketsKanban({ tickets: initial }: { tickets: Ticket[] }) {
  const [tickets, setTickets] = useState(initial);

  const moveTicket = async (id: string, status: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    await fetch(`/api/admin/tickets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {COLUMNS.map(col => {
        const colTickets = tickets.filter(t => t.status === col.id);
        return (
          <div key={col.id} className="rounded-xl border border-border bg-surface-2">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${col.color}`} />
                <span className="text-sm font-semibold">{col.label}</span>
              </div>
              <span className="text-xs text-muted bg-surface px-2 py-0.5 rounded-full">{colTickets.length}</span>
            </div>
            <div className="p-3 space-y-2 min-h-[200px]">
              {colTickets.length === 0 ? (
                <div className="text-center text-xs text-muted py-8 opacity-50">No tickets</div>
              ) : (
                colTickets.map(t => <TicketCard key={t.id} ticket={t} onMove={moveTicket} />)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
