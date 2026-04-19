import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: agent } = await supabase
    .from('agents')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!agent) notFound();

  return (
    <div className="space-y-6">
      <Link href="/dashboard/agents" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to agents
      </Link>

      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
          <Bot className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">{agent.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className={cn('text-[10px] px-2 py-0.5',
              agent.status === 'active' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' :
              agent.status === 'paused' ? 'border-amber-500/30 text-amber-500 bg-amber-500/10' :
              'border-border/50 text-muted-foreground'
            )}>
              {agent.status || 'draft'}
            </Badge>
            <span className="text-xs text-muted-foreground capitalize">{agent.type || 'chatbot'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/30 bg-card/60">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">{agent.description || 'No description provided.'}</p>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/60">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-2">Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Model</span><span>{agent.model || 'gpt-4o'}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Created</span><span>{new Date(agent.created_at).toLocaleDateString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">ID</span><code className="text-xs font-mono bg-secondary/50 px-1.5 py-0.5 rounded">{agent.id.slice(0, 12)}...</code></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
