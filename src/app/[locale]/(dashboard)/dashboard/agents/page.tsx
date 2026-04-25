import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Plus, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

export default async function AgentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: agents } = await supabase
    .from('agents')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const agentList = agents || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">My Agents</h1>
          <p className="text-sm text-muted-foreground mt-1">{agentList.length} agent{agentList.length !== 1 ? 's' : ''} total</p>
        </div>
        <Link href="/dashboard/agents">
          <Button className="bg-primary hover:bg-primary/90 cursor-pointer shadow-[0_2px_8px_hsl(var(--brand)/0.3)]">
            <Plus className="h-4 w-4 mr-2" />
            Create Agent
          </Button>
        </Link>
      </div>

      {/* Agent Grid */}
      {agentList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No agents yet</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            Create your first AI agent to start automating tasks and engaging customers.
          </p>
          <Link href="/dashboard/agents">
            <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Agent
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {agentList.map((agent) => (
            <Card key={agent.id} className="border-border/30 bg-card/60 hover:border-primary/25 hover:shadow-lg transition-all duration-200 cursor-pointer group h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold truncate max-w-[180px]">{agent.name}</h3>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-medium mt-0.5 border-0 text-primary bg-primary/10">
                        {agent.type || 'chatbot'}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn('text-[10px] px-2 py-0.5 font-medium',
                    agent.status === 'active' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500' :
                    agent.status === 'paused' ? 'border-amber-500/30 bg-amber-500/10 text-amber-500' :
                    'border-border/50 bg-secondary/50 text-muted-foreground'
                  )}>
                    <span className={cn('h-1.5 w-1.5 rounded-full mr-1.5 inline-block',
                      agent.status === 'active' ? 'bg-emerald-500' :
                      agent.status === 'paused' ? 'bg-amber-500' : 'bg-muted-foreground'
                    )} />
                    {agent.status || 'draft'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                  {agent.description || 'No description'}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(agent.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
