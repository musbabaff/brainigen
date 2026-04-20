import { createClient } from '@/lib/supabase/server';
import { Users, CreditCard, Bot, Ticket, TrendingUp, TrendingDown } from 'lucide-react';

async function getStats() {
  const supabase = await createClient();

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [usersCount, agentsCount, ticketsCount, revenue] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('agents').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('tickets').select('*', { count: 'exact', head: true }).eq('status', 'open'),
    supabase.from('invoices').select('amount').eq('status', 'paid').gte('created_at', thirtyDaysAgo),
  ]);

  const mrr = revenue.data?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;

  return {
    totalUsers: usersCount.count || 0,
    activeAgents: agentsCount.count || 0,
    openTickets: ticketsCount.count || 0,
    mrr,
  };
}

async function getRecentSignups() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('profiles')
    .select('id, full_name, email, created_at, avatar_url, plan')
    .order('created_at', { ascending: false })
    .limit(10);
  return data || [];
}

async function getRecentActivity() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('activity_log')
    .select('*, profiles(full_name)')
    .order('created_at', { ascending: false })
    .limit(15);
  return data || [];
}

export default async function AdminDashboardPage() {
  const [stats, signups, activity] = await Promise.all([
    getStats(),
    getRecentSignups(),
    getRecentActivity(),
  ]);

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, change: '+12%', positive: true },
    { label: 'MRR', value: `$${stats.mrr.toLocaleString()}`, icon: CreditCard, change: '+8%', positive: true },
    { label: 'Active Agents', value: stats.activeAgents, icon: Bot, change: '+23%', positive: true },
    { label: 'Open Tickets', value: stats.openTickets, icon: Ticket, change: '-4%', positive: true },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h2 mb-2">Dashboard</h1>
        <p className="text-muted">Overview of your Brainigen platform</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="p-5 rounded-xl border border-border bg-surface">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-brand-soft flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-brand" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                stat.positive ? 'text-success' : 'text-danger'
              }`}>
                {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-semibold mb-1">{stat.value}</div>
            <div className="text-sm text-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent signups + activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-surface">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-semibold">Recent Signups</h3>
          </div>
          <div className="divide-y divide-border">
            {signups.length === 0 ? (
              <div className="p-8 text-center text-muted">No signups yet</div>
            ) : (
              signups.map((user) => (
                <div key={user.id} className="flex items-center gap-3 p-4">
                  <div className="w-9 h-9 rounded-full bg-brand-soft flex items-center justify-center text-xs text-brand font-semibold">
                    {user.full_name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{user.full_name || 'Unknown'}</div>
                    <div className="text-xs text-muted truncate">{user.email}</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-2 text-muted uppercase">
                    {user.plan || 'free'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-semibold">Recent Activity</h3>
          </div>
          <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
            {activity.length === 0 ? (
              <div className="p-8 text-center text-muted">No activity yet</div>
            ) : (
              activity.map((log) => (
                <div key={log.id} className="p-4">
                  <div className="text-sm">
                    <span className="font-medium">{log.profiles?.full_name || 'System'}</span>
                    <span className="text-muted"> — {log.action}</span>
                  </div>
                  <div className="text-xs text-muted mt-1">
                    {new Date(log.created_at).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
