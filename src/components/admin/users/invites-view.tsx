'use client';

import { useState } from 'react';
import { Mail, Copy, X, Check } from 'lucide-react';
import { DataTable, type Column } from '@/components/admin/data-table';
import { RoleBadge } from './role-badge';
import { formatDistanceToNow } from '@/lib/date-utils';

type Invitation = {
  id: string;
  email: string;
  role: string;
  token: string;
  expires_at: string;
  accepted_at: string | null;
  created_at: string;
};

export function InvitesView({ invites: initialInvites }: { invites: Invitation[] }) {
  const [invites, setInvites] = useState(initialInvites);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('customer');
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const sendInvite = async () => {
    if (!email || sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/admin/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });
      if (res.ok) {
        const data = await res.json();
        setInvites([data.invitation, ...invites]);
        setEmail('');
      }
    } finally {
      setSending(false);
    }
  };

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/invite/${token}`;
    navigator.clipboard.writeText(url);
    setCopied(token);
    setTimeout(() => setCopied(null), 2000);
  };

  const cancelInvite = async (id: string) => {
    const res = await fetch(`/api/admin/invitations/${id}`, { method: 'DELETE' });
    if (res.ok) setInvites(invites.filter(i => i.id !== id));
  };

  const columns: Column<Invitation>[] = [
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: (inv) => <RoleBadge role={inv.role} /> },
    {
      key: 'expires_at',
      label: 'Status',
      render: (inv) => {
        const expired = new Date(inv.expires_at) < new Date();
        if (inv.accepted_at) return <span className="text-xs text-green-500">Accepted</span>;
        if (expired) return <span className="text-xs text-red-500">Expired</span>;
        return <span className="text-xs text-amber-500">Pending</span>;
      },
    },
    {
      key: 'created_at',
      label: 'Sent',
      sortable: true,
      render: (inv) => <span className="text-xs text-muted">{formatDistanceToNow(inv.created_at)}</span>,
    },
    {
      key: 'token',
      label: '',
      width: '80px',
      render: (inv) => (
        <div className="flex items-center gap-1 justify-end">
          <button
            onClick={(e) => { e.stopPropagation(); copyLink(inv.token); }}
            className="p-1.5 rounded hover:bg-surface-2"
            title="Copy invite link"
          >
            {copied === inv.token ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted" />}
          </button>
          {!inv.accepted_at && (
            <button
              onClick={(e) => { e.stopPropagation(); cancelInvite(inv.id); }}
              className="p-1.5 rounded hover:bg-surface-2 text-red-500"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Send New Invitation
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendInvite()}
            placeholder="user@example.com"
            className="flex-1 h-10 px-3 rounded-md bg-surface-2 border border-border text-sm focus:border-brand focus:outline-none transition-colors"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-10 px-3 rounded-md bg-surface-2 border border-border text-sm focus:border-brand focus:outline-none"
          >
            <option value="customer">Customer</option>
            <option value="support">Support</option>
            <option value="editor">Editor</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={sendInvite}
            disabled={!email || sending}
            className="h-10 px-4 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 disabled:opacity-50 transition-colors"
          >
            {sending ? 'Sending...' : 'Send Invite'}
          </button>
        </div>
      </div>

      <DataTable
        data={invites}
        columns={columns}
        searchKeys={['email']}
        exportFilename="invitations"
        emptyTitle="No invitations"
        emptyDescription="Send your first invite above"
      />
    </div>
  );
}
