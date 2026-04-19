import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

const planDetails = [
  { name: 'Free', price: '$0', features: ['1 agent', '100 msgs/mo', 'Community support'] },
  { name: 'Starter', price: '$29', features: ['5 agents', '5K msgs/mo', 'Email support', 'Analytics', 'Custom branding'] },
  { name: 'Pro', price: '$99', features: ['Unlimited agents', '50K msgs/mo', 'Priority support', 'Custom models', 'Full API access'] },
];

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single();

  const currentPlan = profile?.plan || 'free';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em]">Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your subscription and billing details.</p>
      </div>

      {/* Current Plan */}
      <Card className="border-border/30 bg-card/60">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Current Plan</p>
              <p className="text-2xl font-bold capitalize mt-1">{currentPlan}</p>
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 bg-emerald-500/10">Active</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {planDetails.map((plan) => {
            const isCurrent = plan.name.toLowerCase() === currentPlan;
            return (
              <Card key={plan.name} className={cn('border-border/30 bg-card/60 relative', isCurrent && 'border-primary/40 shadow-lg shadow-primary/8')}>
                {isCurrent && (
                  <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground border-0 text-[10px] px-2.5">
                    Current Plan
                  </Badge>
                )}
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
                  <p className="text-3xl font-bold mt-1 tracking-[-0.02em]">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                  <ul className="space-y-2 mt-5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={cn('w-full mt-5 cursor-pointer', isCurrent ? 'bg-secondary text-muted-foreground' : 'bg-primary hover:bg-primary/90')} disabled={isCurrent}>
                    {isCurrent ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Invoice History */}
      <Card className="border-border/30 bg-card/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Invoice History</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <Inbox className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold mb-1">No invoices yet</p>
            <p className="text-xs text-muted-foreground">Invoices will appear here once you subscribe to a paid plan.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
