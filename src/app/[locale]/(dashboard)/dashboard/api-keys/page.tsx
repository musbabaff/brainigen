import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Key, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function ApiKeysPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: apiKeys } = await supabase
    .from('api_keys')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const keyList = apiKeys || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">API Keys</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your API keys for programmatic access.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
          <Plus className="h-4 w-4 mr-2" /> Generate New Key
        </Button>
      </div>

      {keyList.length === 0 ? (
        <Card className="border-border/30 bg-card/60">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
                <Key className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No API keys yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-4">
                Generate an API key to integrate Brainigen into your applications programmatically.
              </p>
              <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
                <Plus className="h-4 w-4 mr-2" /> Generate Your First Key
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/30 bg-card/60">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Name</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Key</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Created</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {keyList.map((key) => (
                    <tr key={key.id} className="border-b border-border/10 hover:bg-accent/30 transition-colors">
                      <td className="p-4 font-medium flex items-center gap-2">
                        <Key className="h-3.5 w-3.5 text-muted-foreground" /> {key.name || 'Unnamed Key'}
                      </td>
                      <td className="p-4">
                        <code className="text-xs font-mono bg-secondary/50 px-2 py-1 rounded">
                          {key.key_prefix || 'sk-'}...
                        </code>
                      </td>
                      <td className="p-4 text-muted-foreground">{new Date(key.created_at).toLocaleDateString()}</td>
                      <td className="p-4">
                        <Badge variant="outline" className={cn('text-[10px]',
                          key.status === 'active' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' :
                          'border-destructive/30 text-destructive bg-destructive/10'
                        )}>{key.status || 'active'}</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm" className="h-7 text-xs cursor-pointer text-destructive hover:text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-border/30 bg-card/60">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">API Documentation</p>
            <p className="text-xs text-muted-foreground">Learn how to integrate with the Brainigen API.</p>
          </div>
          <Button variant="outline" size="sm" className="cursor-pointer text-xs">
            <ExternalLink className="h-3 w-3 mr-1" /> View Docs
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
