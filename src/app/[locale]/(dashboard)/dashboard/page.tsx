import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import {
  Bot, MessageSquare, Zap, DollarSign, Plus, BarChart3,
  CreditCard, ArrowRight, Inbox, Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Fetch REAL data from Supabase in parallel
  const [profileRes, agentsRes, conversationsRes] = await Promise.all([
    supabase.from('profiles').select('full_name, plan, avatar_url').eq('id', user.id).single(),
    supabase.from('agents').select('id, name, type, status, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
    supabase.from('conversations').select('id, agent_id, status, created_at, message_count').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
  ]);

  const profile = profileRes.data;
  const agents = agentsRes.data || [];
  const conversations = conversationsRes.data || [];
  const displayName = profile?.full_name || user.email?.split('@')[0] || 'there';
  const plan = profile?.plan || 'free';

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em]">
          Welcome back, {displayName}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here&apos;s an overview of your Brainigen workspace.
        </p>
      </div>

      {/* Stat Cards — REAL numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Bot}
          label="Total Agents"
          value={agents.length.toString()}
          color="text-primary"
        />
        <StatCard
          icon={MessageSquare}
          label="Conversations"
          value={conversations.length.toString()}
          color="text-blue-500"
        />
        <StatCard
          icon={Zap}
          label="Messages"
          value={conversations.reduce((sum, c) => sum + (c.message_count || 0), 0).toLocaleString()}
          color="text-amber-500"
        />
        <StatCard
          icon={DollarSign}
          label="Plan"
          value={plan.charAt(0).toUpperCase() + plan.slice(1)}
          color="text-emerald-500"
        />
      </div>

      {/* Recent Agents + Conversations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Agents */}
        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold">Your Agents</CardTitle>
            <Link href="/dashboard/agents" className="text-xs text-primary hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {agents.length === 0 ? (
              <EmptyState
                icon={Bot}
                title="No agents yet"
                description="Create your first AI agent to get started."
                actionLabel="Create Agent"
                actionHref="/dashboard/agents"
              />
            ) : (
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium truncate">{agent.name}</p>
                      <p className="text-[11px] text-muted-foreground capitalize">{agent.type || 'chatbot'}</p>
                    </div>
                    <span className={cn(
                      'text-[10px] font-medium px-2 py-0.5 rounded-full',
                      agent.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' :
                      agent.status === 'paused' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-muted text-muted-foreground'
                    )}>
                      {agent.status || 'draft'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Conversations */}
        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold">Recent Conversations</CardTitle>
            <Link href="/dashboard/agents" className="text-xs text-primary hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {conversations.length === 0 ? (
              <EmptyState
                icon={MessageSquare}
                title="No conversations yet"
                description="Conversations appear here when users chat with your agents."
                actionLabel="Create an Agent"
                actionHref="/dashboard/agents"
              />
            ) : (
              <div className="space-y-3">
                {conversations.map((conv) => (
                  <div key={conv.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium truncate">Conversation #{conv.id.slice(0, 8)}</p>
                      <p className="text-[11px] text-muted-foreground">{conv.message_count || 0} messages</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(conv.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickAction
          icon={Plus}
          iconColor="text-primary"
          iconBg="bg-primary/10"
          title="Create New Agent"
          desc="Build an AI agent"
          href="/dashboard/agents"
        />
        <QuickAction
          icon={BarChart3}
          iconColor="text-blue-500"
          iconBg="bg-blue-500/10"
          title="View Analytics"
          desc="Performance insights"
          href="/dashboard/analytics"
        />
        <QuickAction
          icon={CreditCard}
          iconColor="text-emerald-500"
          iconBg="bg-emerald-500/10"
          title="Manage Billing"
          desc="Plans & invoices"
          href="/dashboard/billing"
        />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: typeof Bot; label: string; value: string; color: string }) {
  return (
    <Card className="border-border/30 bg-card/60">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center', color.replace('text-', 'bg-') + '/10')}>
            <Icon className={cn('h-4.5 w-4.5', color)} />
          </div>
        </div>
        <p className="text-2xl font-bold tracking-[-0.02em]">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </CardContent>
    </Card>
  );
}

function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: {
  icon: typeof Bot; title: string; description: string; actionLabel: string; actionHref: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground mb-4 max-w-xs">{description}</p>
      <Link href={actionHref} className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
        {actionLabel} <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

function QuickAction({ icon: Icon, iconColor, iconBg, title, desc, href }: {
  icon: typeof Bot; iconColor: string; iconBg: string; title: string; desc: string; href: string;
}) {
  return (
    <Link href={href}>
      <Card className="border-border/30 bg-card/60 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 cursor-pointer group h-full">
        <CardContent className="p-5 flex items-center gap-4">
          <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center group-hover:opacity-90 transition-colors', iconBg)}>
            <Icon className={cn('h-5 w-5', iconColor)} />
          </div>
          <div>
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
