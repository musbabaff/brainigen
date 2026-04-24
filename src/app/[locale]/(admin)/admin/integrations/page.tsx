import { createClient } from '@/lib/supabase/server';
import { Plug, Check, X } from 'lucide-react';

const INTEGRATION_META: Record<string, { label: string; description: string; color: string }> = {
  stripe: { label: 'Stripe', description: 'Payment processing and subscriptions', color: 'bg-purple-500/10 text-purple-500' },
  resend: { label: 'Resend', description: 'Transactional email delivery', color: 'bg-blue-500/10 text-blue-500' },
  openai: { label: 'OpenAI', description: 'AI language model integration', color: 'bg-green-500/10 text-green-500' },
  slack: { label: 'Slack', description: 'Team notifications and alerts', color: 'bg-amber-500/10 text-amber-500' },
  notion: { label: 'Notion', description: 'Knowledge base and docs sync', color: 'bg-surface-2 text-foreground' },
  google_drive: { label: 'Google Drive', description: 'File storage and document access', color: 'bg-red-500/10 text-red-500' },
  hubspot: { label: 'HubSpot', description: 'CRM and customer data sync', color: 'bg-orange-500/10 text-orange-500' },
  zapier: { label: 'Zapier', description: 'No-code automation workflows', color: 'bg-brand-soft text-brand' },
};

export default async function IntegrationsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('integration_configs').select('provider, enabled, updated_at');
  const enabledMap = Object.fromEntries((data ?? []).map(r => [r.provider, r.enabled]));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Plug className="w-5 h-5 text-brand" /></div>
        <div><h1 className="text-h2">Integrations</h1><p className="text-muted text-sm">Configure third-party service connections</p></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Object.entries(INTEGRATION_META).map(([provider, meta]) => {
          const enabled = enabledMap[provider] ?? false;
          return (
            <div key={provider} className="p-5 rounded-xl border border-border bg-surface hover:border-brand/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-medium px-2 py-1 rounded ${meta.color}`}>{meta.label}</span>
                {enabled ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-muted opacity-40" />}
              </div>
              <p className="text-sm text-muted mb-4">{meta.description}</p>
              <div className={`text-xs font-medium ${enabled ? 'text-green-500' : 'text-muted'}`}>
                {enabled ? '✓ Connected' : 'Not configured'}
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 rounded-xl border border-border bg-surface-2 text-sm text-muted">
        Configure API keys and credentials via <strong className="text-foreground">Site Settings → OpenAI / Stripe / Email tabs</strong>.
      </div>
    </div>
  );
}
