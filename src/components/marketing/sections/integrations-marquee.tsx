'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const integrations = [
  'Salesforce', 'HubSpot', 'Slack', 'Discord', 'Teams', 'Gmail',
  'Notion', 'GitHub', 'Jira', 'Stripe', 'Shopify', 'Zendesk',
  'Intercom', 'Calendly', 'Zapier', 'Airtable', 'Linear', 'Asana',
  'Twilio', 'SendGrid', 'Mixpanel', 'Segment', 'Amplitude', 'Freshdesk',
  'Pipedrive', 'Mailchimp', 'Dropbox', 'Google Drive', 'WooCommerce', 'PayPal',
];

export function IntegrationsMarquee() {
  return (
    <section className="py-20 lg:py-28 bg-[hsl(var(--surface-2))] overflow-hidden">
      <div className="container-narrow">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-h2 mb-4">Integrates with your entire stack</h2>
          <p className="text-lead max-w-2xl mx-auto">Connect to 50+ tools your team already uses. No custom code required.</p>
        </motion.div>
      </div>

      {/* Marquee row 1 */}
      <div className="relative mb-4">
        <div className="flex animate-[marquee_40s_linear_infinite] gap-4">
          {[...integrations.slice(0, 15), ...integrations.slice(0, 15)].map((name, i) => (
            <div key={`${name}-${i}`} className="shrink-0 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-5 py-3 text-sm font-medium text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))] hover:border-[hsl(var(--border-strong))] transition-all cursor-default">
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Marquee row 2 (reverse) */}
      <div className="relative mb-12">
        <div className="flex animate-[marquee_45s_linear_infinite_reverse] gap-4">
          {[...integrations.slice(15), ...integrations.slice(15)].map((name, i) => (
            <div key={`${name}-${i}`} className="shrink-0 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-5 py-3 text-sm font-medium text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))] hover:border-[hsl(var(--border-strong))] transition-all cursor-default">
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link href="/integrations" className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--brand))] hover:underline">
          View all 50+ integrations <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
