'use client';

import { motion } from 'framer-motion';
import { Layout, Cloud, Globe, TrendingUp, ArrowRight } from 'lucide-react';

const showcases = [
  {
    icon: Layout,
    title: 'Build your first agent in 5 minutes',
    desc: 'Visual drag-and-drop builder with pre-built templates. Define behavior, set tone, add tools — ship in minutes, not months.',
    visual: 'builder',
  },
  {
    icon: Cloud,
    title: 'Connect any data source',
    desc: 'Import from PDFs, websites, APIs, databases. Real-time sync keeps your agent always up-to-date.',
    visual: 'sources',
  },
  {
    icon: Globe,
    title: 'Deploy everywhere',
    desc: 'Web widget, Slack, WhatsApp, API, SMS, voice — your agent meets customers where they are.',
    visual: 'channels',
  },
  {
    icon: TrendingUp,
    title: 'Watch it learn and improve',
    desc: 'Real-time analytics, conversation insights, and automatic prompt optimization. Your agent gets smarter every day.',
    visual: 'analytics',
  },
];

function MockVisual({ type }: { type: string }) {
  if (type === 'builder') {
    return (
      <div className="space-y-2">
        {['Intent Recognition', 'Response Generator', 'Knowledge Lookup', 'Escalation Handler'].map((n, i) => (
          <div key={n} className="flex items-center gap-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] p-3">
            <div className={`h-8 w-8 rounded-md flex items-center justify-center text-xs font-bold text-white ${
              ['bg-[hsl(var(--brand))]', 'bg-emerald-500', 'bg-blue-500', 'bg-orange-500'][i]
            }`}>{i + 1}</div>
            <span className="text-sm font-medium">{n}</span>
          </div>
        ))}
      </div>
    );
  }
  if (type === 'sources') {
    return (
      <div className="grid grid-cols-3 gap-2">
        {['PDF', 'Website', 'API', 'Notion', 'Drive', 'Slack', 'DB', 'CSV', 'GitHub'].map(s => (
          <div key={s} className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] p-3 text-center text-xs font-medium">{s}</div>
        ))}
      </div>
    );
  }
  if (type === 'channels') {
    return (
      <div className="flex flex-wrap gap-2">
        {['Web Widget', 'Slack', 'WhatsApp', 'API', 'SMS', 'Voice', 'Email', 'Teams'].map(c => (
          <span key={c} className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] px-3 py-1.5 text-xs font-medium">{c}</span>
        ))}
      </div>
    );
  }
  // analytics
  const bars = [30, 45, 60, 40, 70, 55, 80, 65, 75, 90, 85, 95];
  return (
    <div className="flex items-end gap-1 h-24">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 rounded-sm bg-[hsl(var(--brand)/0.7)]" style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

export function Showcase() {
  return (
    <section className="py-20 lg:py-28 bg-[hsl(var(--surface-2))]">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 mb-4">See Brainigen in action</h2>
          <p className="text-lead max-w-2xl mx-auto">
            From idea to production in minutes. Here&apos;s how it works.
          </p>
        </motion.div>

        <div className="space-y-8">
          {showcases.map((s, i) => {
            const Icon = s.icon;
            const isReversed = i % 2 === 1;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-8 ${isReversed ? 'lg:direction-rtl' : ''}`}
              >
                <div className={isReversed ? 'lg:order-2' : ''}>
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--brand)/0.1)] flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-[hsl(var(--brand))]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-[hsl(var(--muted))] mb-4 leading-relaxed">{s.desc}</p>
                  <a href="/register" className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--brand))] hover:underline">
                    Try it now <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className={isReversed ? 'lg:order-1' : ''}>
                  <MockVisual type={s.visual} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
