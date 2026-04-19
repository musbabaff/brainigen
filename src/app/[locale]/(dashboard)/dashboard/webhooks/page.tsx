import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Globe } from 'lucide-react';

export default async function WebhooksPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: webhooks } = await supabase
    .from('webhooks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const webhookList = webhooks || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">Webhooks</h1>
          <p className="text-sm text-muted-foreground mt-1">Subscribe to events and receive real-time notifications.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer text-sm">
          <Plus className="h-4 w-4 mr-1.5" /> Create Webhook
        </Button>
      </div>

      {webhookList.length === 0 ? (
        <Card className="border-border/30 bg-card/60">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
                <Globe className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No webhooks configured</h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-4">
                Create a webhook to receive real-time event notifications when your agents interact with users.
              </p>
              <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
                <Plus className="h-4 w-4 mr-2" /> Create Your First Webhook
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {webhookList.map((wh) => (
            <Card key={wh.id} className="border-border/40 bg-card/80 rounded-xl">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold truncate">{wh.name || 'Unnamed Webhook'}</h3>
                    <p className="text-xs text-muted-foreground font-mono truncate">{wh.url}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(wh.created_at).toLocaleDateString()}
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
