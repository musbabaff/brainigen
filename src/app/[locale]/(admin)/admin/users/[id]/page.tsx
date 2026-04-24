import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Activity, DollarSign, Bot } from 'lucide-react';
import { RoleBadge } from '@/components/admin/users/role-badge';
import { PlanBadge } from '@/components/admin/users/plan-badge';
import { UserActions } from '@/components/admin/users/user-actions';
import { formatDistanceToNow } from '@/lib/date-utils';

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: user } = await supabase.from('profiles').select('*').eq('id', id).single();
  if (!user) notFound();

  const [agents, invoices, activity] = await Promise.all([
    supabase.from('agents').select('id, name, type, status, created_at').eq('user_id', id),
    supabase.from('invoices').select('amount, status, created_at').eq('user_id', id).order('created_at', { ascending: false }).limit(5),
    supabase.from('activity_log').select('id, action, created_at').eq('user_id', id).order('created_at', { ascending: false }).limit(10),
  ]);

  const totalRevenue = invoices.data?.filter(i => i.status === 'paid').reduce((sum, i) => sum + Number(i.amount), 0) || 0;
  const initials = user.full_name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'U';

  return (
    <div className="space-y-6">
      <Link href="/admin/users" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to users
      </Link>

      <div className="rounded-xl border border-border bg-surface p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-soft flex items-center justify-center text-brand text-xl font-semibold shrink-0">
              {initials}
            </div>
            <div>
              <h1 className="text-h2 mb-2">{user.full_name || 'Unnamed User'}</h1>
              <div className="flex items-center gap-2 text-sm text-muted mb-3">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>
              <div className="flex items-center flex-wrap gap-2">
                <RoleBadge role={user.role} />
                <PlanBadge plan={user.plan || 'free'} />
                {user.mfa_enabled && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-500 uppercase">2FA ON</span>
                )}
                {user.banned && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-500 uppercase">Banned</span>
                )}
              </div>
            </div>
          </div>
          <UserActions user={{ id: user.id, banned: user.banned }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div>
            <div className="text-xs text-muted uppercase tracking-wider mb-1">Joined</div>
            <div className="text-sm font-medium">{formatDistanceToNow(user.created_at)}</div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wider mb-1">Last Active</div>
            <div className="text-sm font-medium">
              {user.last_sign_in_at ? formatDistanceToNow(user.last_sign_in_at) : 'Never'}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wider mb-1">Agents</div>
            <div className="text-sm font-medium">{agents.data?.length || 0}</div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wider mb-1">Total Revenue</div>
            <div className="text-sm font-medium">${totalRevenue.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-surface">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Bot className="w-4 h-4 text-muted" />
            <h3 className="font-semibold">Agents ({agents.data?.length || 0})</h3>
          </div>
          <div className="divide-y divide-border">
            {!agents.data || agents.data.length === 0 ? (
              <div className="p-8 text-center text-muted text-sm">No agents yet</div>
            ) : (
              agents.data.map((agent) => (
                <div key={agent.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{agent.name}</div>
                    <div className="text-xs text-muted mt-0.5">{agent.type}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded uppercase ${
                    agent.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-surface-2 text-muted'
                  }`}>{agent.status}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Activity className="w-4 h-4 text-muted" />
            <h3 className="font-semibold">Recent Activity</h3>
          </div>
          <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
            {!activity.data || activity.data.length === 0 ? (
              <div className="p-8 text-center text-muted text-sm">No activity yet</div>
            ) : (
              activity.data.map((log) => (
                <div key={log.id} className="p-4">
                  <div className="text-sm">{log.action}</div>
                  <div className="text-xs text-muted mt-0.5">{formatDistanceToNow(log.created_at)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-muted" />
          <h3 className="font-semibold">Billing History</h3>
        </div>
        <div className="divide-y divide-border">
          {!invoices.data || invoices.data.length === 0 ? (
            <div className="p-8 text-center text-muted text-sm">No invoices</div>
          ) : (
            invoices.data.map((inv, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">${Number(inv.amount).toFixed(2)}</div>
                  <div className="text-xs text-muted mt-0.5">{new Date(inv.created_at).toLocaleDateString()}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded uppercase ${
                  inv.status === 'paid' ? 'bg-green-500/10 text-green-500' :
                  inv.status === 'failed' ? 'bg-red-500/10 text-red-500' :
                  'bg-amber-500/10 text-amber-500'
                }`}>{inv.status}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
