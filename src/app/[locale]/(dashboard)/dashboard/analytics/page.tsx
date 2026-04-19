import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download } from 'lucide-react';

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: agents } = await supabase
    .from('agents')
    .select('id, name')
    .eq('user_id', user.id);

  const hasAgents = agents && agents.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor your AI agent performance.</p>
        </div>
        {hasAgents && (
          <Button variant="outline" size="sm" className="text-xs cursor-pointer">
            <Download className="h-3 w-3 mr-1" /> Export CSV
          </Button>
        )}
      </div>

      {!hasAgents ? (
        <Card className="border-border/30 bg-card/60">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No analytics data yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Create your first agent and start conversations to see analytics data here.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="border-border/30 bg-card/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Messages Over Time</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-[240px] flex items-center justify-center text-sm text-muted-foreground">
                Chart data will appear as conversations accumulate.
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/30 bg-card/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Agent Performance</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/20">
                    <span className="text-sm font-medium">{agent.name}</span>
                    <span className="text-xs text-muted-foreground">Active</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
