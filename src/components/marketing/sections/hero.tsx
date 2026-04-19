'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,hsl(247_75%_60%/0.12)_0%,transparent_60%)]" />
      </div>

      <div className="container-narrow relative">
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="flex justify-center mb-8"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface)/0.7)] backdrop-blur-sm px-4 py-1.5 text-sm hover:border-[hsl(var(--border-strong))] transition-colors"
          >
            <span className="inline-flex items-center gap-1 text-[hsl(var(--brand))] font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              New
            </span>
            <span className="text-[hsl(var(--muted))] group-hover:text-[hsl(var(--fg))] transition-colors">
              Now in public beta — read announcement
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-[hsl(var(--muted))] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="text-display text-center mb-6 max-w-5xl mx-auto"
        >
          {t('title').replace('Think Ahead.', '')}
          <span className="bg-gradient-to-r from-[hsl(var(--brand))] via-purple-500 to-[hsl(var(--brand))] bg-clip-text text-transparent bg-[length:200%] animate-[gradient-flow_4s_ease_infinite]">
            Think Ahead.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-lead text-center max-w-2xl mx-auto mb-10"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
        >
          <Link
            href="/register"
            className="group inline-flex items-center justify-center gap-2 h-11 px-6 bg-[hsl(var(--fg))] text-[hsl(var(--bg))] rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
          >
            {t('cta_primary')}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/demo"
            className="group inline-flex items-center justify-center gap-2 h-11 px-6 border border-[hsl(var(--border))] bg-[hsl(var(--surface)/0.5)] backdrop-blur rounded-lg text-sm font-medium hover:border-[hsl(var(--border-strong))] hover:bg-[hsl(var(--surface-2))] transition-all"
          >
            <Play className="h-3.5 w-3.5" />
            {t('cta_secondary')}
          </Link>
        </motion.div>

        {/* Product preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Glow under mockup */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(var(--brand)/0.2)] via-purple-500/20 to-[hsl(var(--brand)/0.2)] blur-3xl opacity-40" />

          {/* Mockup frame */}
          <div className="relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] overflow-hidden shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 h-10 border-b border-[hsl(var(--border))] bg-[hsl(var(--surface-2))]">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                <div className="h-3 w-3 rounded-full bg-green-400/60" />
              </div>
              <div className="flex-1 text-center text-xs text-[hsl(var(--muted))] font-mono">
                brainigen.com/dashboard
              </div>
            </div>
            {/* Dashboard mockup */}
            <DashboardPreview />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  const stats = [
    { label: 'Messages', value: '12.4k' },
    { label: 'Revenue', value: '$8,240' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Countries', value: '47' },
  ];

  const bars = [40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 95, 70];

  const menuItems = ['Dashboard', 'Agents', 'Knowledge', 'Analytics', 'Billing'];

  return (
    <div className="aspect-[16/9] bg-gradient-to-br from-[hsl(var(--surface))] to-[hsl(var(--surface-2))] p-4 md:p-8">
      <div className="h-full grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        {/* Sidebar */}
        <div className="hidden md:block space-y-2">
          {menuItems.map((item, i) => (
            <div
              key={item}
              className={`h-8 rounded-md px-3 flex items-center text-xs ${
                i === 0
                  ? 'bg-[hsl(var(--brand)/0.1)] text-[hsl(var(--brand))] font-medium'
                  : 'text-[hsl(var(--muted))]'
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        {/* Main */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-3">
                <div className="text-[10px] md:text-xs text-[hsl(var(--muted))] mb-1">{stat.label}</div>
                <div className="text-sm md:text-lg font-semibold">{stat.value}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4 h-24 md:h-40">
            <div className="text-xs text-[hsl(var(--muted))] mb-3">Agent activity</div>
            <div className="flex items-end gap-1 h-12 md:h-20">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[hsl(var(--brand)/0.8)] rounded-sm"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
