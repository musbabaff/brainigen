import { createClient } from '@/lib/supabase/server';
import { Package, Check, X } from 'lucide-react';

const PLANS = [
  { id: 'free', name: 'Free', price_monthly: 0, price_annual: 0, color: 'bg-surface-2 text-muted' },
  { id: 'pro', name: 'Pro', price_monthly: 29, price_annual: 290, color: 'bg-brand-soft text-brand', popular: true },
  { id: 'business', name: 'Business', price_monthly: 99, price_annual: 990, color: 'bg-purple-500/10 text-purple-500' },
  { id: 'enterprise', name: 'Enterprise', price_monthly: 399, price_annual: 3990, color: 'bg-amber-500/10 text-amber-500' },
];

const PLAN_LIMITS: Record<string, Record<string, string | boolean>> = {
  free: { agents: '1', messages: '1,000/mo', knowledge_bases: '0', api_requests: '10/hr', storage: '100MB', voice: false, webhooks: false, team_seats: '1' },
  pro: { agents: '5', messages: '50,000/mo', knowledge_bases: '3', api_requests: '100/hr', storage: '5GB', voice: true, webhooks: true, team_seats: '3' },
  business: { agents: '20', messages: '200,000/mo', knowledge_bases: '10', api_requests: '500/hr', storage: '20GB', voice: true, webhooks: true, team_seats: '10' },
  enterprise: { agents: 'Unlimited', messages: 'Unlimited', knowledge_bases: 'Unlimited', api_requests: '2,000/hr', storage: '100GB', voice: true, webhooks: true, team_seats: 'Unlimited' },
};

const LIMIT_LABELS: Record<string, string> = {
  agents: 'AI Agents', messages: 'Messages/Month', knowledge_bases: 'Knowledge Bases',
  api_requests: 'API Requests/Hour', storage: 'Storage', voice: 'Voice Agents',
  webhooks: 'Webhooks', team_seats: 'Team Seats',
};

export default async function SaasConfigPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('site_settings').select('key, value').like('key', 'plan_%');
  const settingsMap = Object.fromEntries((settings ?? []).map(s => [s.key, s.value]));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Package className="w-5 h-5 text-brand" /></div>
        <div>
          <h1 className="text-h2">SaaS Configuration</h1>
          <p className="text-muted text-sm">Configure plan limits and pricing — changes reflect on /pricing page</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {PLANS.map(plan => (
          <div key={plan.id} className={`rounded-xl border bg-surface p-5 ${plan.popular ? 'border-brand' : 'border-border'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-medium px-2 py-1 rounded ${plan.color}`}>{plan.name}</span>
              {plan.popular && <span className="text-[10px] px-2 py-0.5 rounded bg-brand text-white uppercase tracking-wider">Popular</span>}
            </div>
            <div className="mb-4">
              <div className="text-2xl font-bold">${plan.price_monthly}<span className="text-sm font-normal text-muted">/mo</span></div>
              <div className="text-xs text-muted">${plan.price_annual}/yr billed annually</div>
            </div>
            <div className="space-y-2">
              {Object.entries(PLAN_LIMITS[plan.id]).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-xs">
                  <span className="text-muted">{LIMIT_LABELS[key]}</span>
                  <span className="font-medium">
                    {typeof val === 'boolean' ? (
                      val ? <Check className="w-3.5 h-3.5 text-green-500" /> : <X className="w-3.5 h-3.5 text-muted opacity-40" />
                    ) : val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl border border-border bg-surface-2 text-sm text-muted">
        Full plan editor with live Stripe Price ID management coming in Part 3. Limits above are hardcoded defaults — configure via <strong className="text-foreground">site_settings</strong> table with prefix <code className="text-brand">plan_</code>.
      </div>
    </div>
  );
}
