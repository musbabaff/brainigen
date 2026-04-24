'use client';

import { useState, useCallback } from 'react';
import { Save, Eye, EyeOff, RefreshCw, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabId =
  | 'general' | 'branding' | 'contact' | 'social' | 'seo'
  | 'email' | 'openai' | 'stripe' | 'analytics' | 'ratelimit'
  | 'features';

const TABS: { id: TabId; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'branding', label: 'Branding' },
  { id: 'contact', label: 'Contact' },
  { id: 'social', label: 'Social' },
  { id: 'seo', label: 'SEO' },
  { id: 'email', label: 'Email (Resend)' },
  { id: 'openai', label: 'OpenAI' },
  { id: 'stripe', label: 'Stripe' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'ratelimit', label: 'Rate Limiting' },
  { id: 'features', label: 'Feature Flags' },
];

type Setting = { value: string | null; encrypted: boolean };
type Settings = Record<string, Setting>;

function SettingField({
  label, description, settingKey, value, encrypted, category, onSave
}: {
  label: string;
  description?: string;
  settingKey: string;
  value: string | null;
  encrypted?: boolean;
  category: string;
  onSave: (key: string, value: string, encrypted: boolean, category: string) => Promise<void>;
}) {
  const [current, setCurrent] = useState(value ?? '');
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(settingKey, current, encrypted ?? false, category);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4 border-b border-border last:border-0">
      <div className="sm:w-64 shrink-0">
        <div className="text-sm font-medium">{label}</div>
        {description && <div className="text-xs text-muted mt-0.5">{description}</div>}
      </div>
      <div className="flex-1 flex gap-2">
        <div className="relative flex-1">
          <input
            type={encrypted && !show ? 'password' : 'text'}
            value={current}
            onChange={e => setCurrent(e.target.value)}
            placeholder={encrypted ? '••••••••' : `Enter ${label.toLowerCase()}...`}
            className="w-full h-9 px-3 rounded-md bg-surface-2 border border-border text-sm focus:border-brand focus:outline-none transition-colors"
          />
          {encrypted && (
            <button
              onClick={() => setShow(!show)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="h-9 px-3 rounded-md bg-foreground text-background text-sm font-medium hover:bg-foreground/90 disabled:opacity-50 transition-colors flex items-center gap-1.5"
        >
          {saved ? <Check className="w-4 h-4" /> : saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}

function ToggleField({
  label, description, settingKey, value, category, onSave
}: {
  label: string;
  description?: string;
  settingKey: string;
  value: boolean;
  category: string;
  onSave: (key: string, value: string, encrypted: boolean, category: string) => Promise<void>;
}) {
  const [current, setCurrent] = useState(value);

  const handleToggle = async () => {
    const next = !current;
    setCurrent(next);
    await onSave(settingKey, String(next), false, category);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {description && <div className="text-xs text-muted mt-0.5">{description}</div>}
      </div>
      <button
        onClick={handleToggle}
        className={cn(
          'relative w-11 h-6 rounded-full transition-colors',
          current ? 'bg-brand' : 'bg-surface-2 border border-border'
        )}
      >
        <span className={cn(
          'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform',
          current ? 'translate-x-5' : 'translate-x-0.5'
        )} />
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface mb-6">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="px-6">{children}</div>
    </div>
  );
}

export function SiteSettingsClient({ initialSettings }: { initialSettings: Settings }) {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [settings, setSettings] = useState<Settings>(initialSettings);

  const handleSave = useCallback(async (key: string, value: string, encrypted: boolean, category: string) => {
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value, encrypted, category }),
    });
    if (res.ok) {
      setSettings(prev => ({
        ...prev,
        [key]: { value: encrypted ? null : value, encrypted }
      }));
    }
  }, []);

  const field = (key: string, label: string, description?: string, encrypted = false, category = activeTab) => (
    <SettingField
      key={key}
      label={label}
      description={description}
      settingKey={key}
      value={settings[key]?.value ?? null}
      encrypted={encrypted}
      category={category}
      onSave={handleSave}
    />
  );

  const toggle = (key: string, label: string, description?: string) => (
    <ToggleField
      key={key}
      label={label}
      description={description}
      settingKey={key}
      value={settings[key]?.value === 'true'}
      category={activeTab}
      onSave={handleSave}
    />
  );

  return (
    <div className="space-y-6">
      {/* Tab nav */}
      <div className="flex flex-wrap gap-1 border-b border-border pb-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 text-sm rounded-t-md transition-colors border-b-2 -mb-px',
              activeTab === tab.id
                ? 'border-brand text-brand font-medium'
                : 'border-transparent text-muted hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'general' && (
        <Section title="General Settings">
          {field('site_name', 'Site Name', 'Displayed in browser tabs and emails')}
          {field('site_tagline', 'Tagline', 'Short description of your platform')}
          {field('default_language', 'Default Language', 'e.g. en, tr, az')}
          {field('default_timezone', 'Default Timezone', 'e.g. UTC, America/New_York')}
          {field('support_url', 'Support URL', 'Link to your public help center')}
        </Section>
      )}

      {activeTab === 'branding' && (
        <Section title="Brand Settings">
          {field('brand_primary', 'Primary Color', 'Hex color e.g. #6366f1')}
          {field('brand_soft', 'Brand Soft Color', 'Hex color for backgrounds e.g. #eef2ff')}
          {toggle('dark_mode_default', 'Dark Mode Default', 'Enable dark mode by default for new users')}
        </Section>
      )}

      {activeTab === 'contact' && (
        <Section title="Contact Information">
          {field('support_email', 'Support Email')}
          {field('sales_email', 'Sales Email')}
          {field('contact_form_recipient', 'Contact Form Recipient', 'Email to receive contact form submissions')}
          {field('office_address', 'Office Address')}
          {field('phone', 'Phone Number')}
        </Section>
      )}

      {activeTab === 'social' && (
        <Section title="Social Links">
          {field('social_twitter', 'Twitter / X URL')}
          {field('social_linkedin', 'LinkedIn URL')}
          {field('social_github', 'GitHub URL')}
          {field('social_youtube', 'YouTube URL')}
          {field('social_facebook', 'Facebook URL')}
        </Section>
      )}

      {activeTab === 'seo' && (
        <Section title="SEO Settings">
          {field('seo_title_pattern', 'Title Pattern', 'e.g. %s | Brainigen')}
          {field('seo_default_description', 'Default Meta Description')}
          {field('google_search_console', 'Google Search Console Verification')}
          {field('bing_verification', 'Bing Verification Code')}
          {field('robots_txt', 'robots.txt Content')}
        </Section>
      )}

      {activeTab === 'email' && (
        <Section title="Email (Resend)">
          {field('resend_api_key', 'Resend API Key', 'Your Resend.com API key', true)}
          {field('email_from', 'From Email', 'e.g. hello@brainigen.com')}
          {field('email_from_name', 'From Name', 'e.g. Brainigen')}
          {field('email_reply_to', 'Reply-To Address')}
        </Section>
      )}

      {activeTab === 'openai' && (
        <Section title="OpenAI Configuration">
          {field('openai_api_key', 'API Key', 'Your OpenAI API key', true)}
          {field('openai_org_id', 'Organization ID', 'Optional organization ID')}
          {field('openai_default_model', 'Default Model', 'e.g. gpt-4o-mini')}
          {field('openai_max_tokens', 'Max Tokens Default', 'e.g. 2048')}
          {field('openai_temperature', 'Temperature Default', 'e.g. 0.7')}
        </Section>
      )}

      {activeTab === 'stripe' && (
        <Section title="Stripe Configuration">
          {field('stripe_publishable_key', 'Publishable Key', 'Starts with pk_')}
          {field('stripe_secret_key', 'Secret Key', 'Starts with sk_', true)}
          {field('stripe_webhook_secret', 'Webhook Signing Secret', 'Starts with whsec_', true)}
          {toggle('stripe_test_mode', 'Test Mode', 'Use Stripe test keys instead of live')}
        </Section>
      )}

      {activeTab === 'analytics' && (
        <Section title="Analytics & Tracking">
          {field('google_analytics_id', 'Google Analytics ID', 'e.g. G-XXXXXXXXXX')}
          {field('plausible_domain', 'Plausible Domain', 'e.g. brainigen.com')}
          {field('posthog_key', 'PostHog API Key', undefined, true)}
          {field('mixpanel_token', 'Mixpanel Token', undefined, true)}
        </Section>
      )}

      {activeTab === 'ratelimit' && (
        <Section title="Rate Limiting (Upstash)">
          {field('upstash_redis_url', 'Upstash Redis URL', undefined, true)}
          {field('upstash_token', 'Upstash Token', undefined, true)}
          {field('ratelimit_free', 'Free Plan Requests/Hour', 'e.g. 10')}
          {field('ratelimit_pro', 'Pro Plan Requests/Hour', 'e.g. 100')}
          {field('ratelimit_business', 'Business Plan Requests/Hour', 'e.g. 500')}
          {field('ratelimit_enterprise', 'Enterprise Plan Requests/Hour', 'e.g. 2000')}
        </Section>
      )}

      {activeTab === 'features' && (
        <Section title="Feature Flags">
          {toggle('feature_voice_agents', 'Voice Agents', 'Enable voice-based AI agents')}
          {toggle('feature_knowledge_base', 'Knowledge Base', 'Enable knowledge base uploads')}
          {toggle('feature_workflows', 'Workflows', 'Enable automated workflow builder')}
          {toggle('feature_webhooks', 'Webhooks', 'Enable webhook integrations')}
          {toggle('feature_api_access', 'API Access', 'Enable API key creation for users')}
          {toggle('feature_team_workspaces', 'Team Workspaces', 'Enable multi-user team workspaces')}
          {toggle('feature_2fa_enforcement', '2FA Enforcement', 'Require 2FA for all admin accounts')}
          {toggle('feature_ai_demo', 'Public AI Demo', 'Show the /demo page publicly')}
        </Section>
      )}
    </div>
  );
}
