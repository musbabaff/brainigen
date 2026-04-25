'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, ChevronRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

function BeamLine({ delay = 0, duration = 3, className = '' }: { delay?: number; duration?: number; className?: string }) {
  return (
    <motion.div
      className={`absolute h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand)/0.6)] to-transparent ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
      transition={{ delay, duration, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
      style={{ transformOrigin: 'left center' }}
    />
  );
}

function FloatingOrb({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} style={style} />
  );
}

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-28 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Ambient orbs */}
      <FloatingOrb className="w-[600px] h-[600px] top-[-200px] left-1/2 -translate-x-1/2 bg-[hsl(var(--brand)/0.08)] animate-pulse-glow" />
      <FloatingOrb className="w-[300px] h-[300px] top-1/3 right-[-100px] bg-violet-500/5 animate-float" style={{ animationDelay: '1s' }} />
      <FloatingOrb className="w-[200px] h-[200px] top-1/2 left-[-50px] bg-[hsl(var(--brand)/0.06)]" />

      {/* Beam lines */}
      <BeamLine delay={0.5} duration={2.5} className="w-2/3 top-[35%] left-[10%]" />
      <BeamLine delay={1.5} duration={2} className="w-1/2 top-[60%] right-[5%]" />

      <div className="container-narrow relative z-10">
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex justify-center mb-10"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface)/0.8)] backdrop-blur-sm px-4 py-1.5 text-sm hover:border-[hsl(var(--border-strong))] transition-all duration-200 shadow-sm"
          >
            <span className="inline-flex items-center gap-1.5 text-[hsl(var(--brand))] font-semibold">
              <Sparkles className="h-3 w-3" />
              New
            </span>
            <span className="w-px h-3.5 bg-[hsl(var(--border))]" />
            <span className="text-[hsl(var(--muted))] group-hover:text-[hsl(var(--fg))] transition-colors">
              Now in public beta — read announcement
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-[hsl(var(--muted))] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="text-display text-center mb-6 max-w-5xl mx-auto"
        >
          {t('title').replace('Think Ahead.', '')}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[hsl(var(--brand))] via-violet-400 to-[hsl(var(--brand))] bg-clip-text text-transparent bg-[length:200%] animate-[gradient-flow_4s_ease_infinite]">
              Think Ahead.
            </span>
            {/* Underline glow */}
            <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand)/0.5)] to-transparent" />
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
          className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
        >
          <Link
            href="/register"
            className="group inline-flex items-center justify-center gap-2 h-12 px-7 bg-[hsl(var(--fg))] text-[hsl(var(--bg))] rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {t('cta_primary')}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/demo"
            className="group inline-flex items-center justify-center gap-2 h-12 px-6 border border-[hsl(var(--border))] bg-[hsl(var(--surface)/0.6)] backdrop-blur rounded-xl text-sm font-medium hover:border-[hsl(var(--border-strong))] hover:bg-[hsl(var(--surface-2))] transition-all cursor-pointer"
          >
            <div className="h-6 w-6 rounded-full bg-[hsl(var(--brand)/0.1)] flex items-center justify-center">
              <Play className="h-3 w-3 text-[hsl(var(--brand))] fill-current ml-0.5" />
            </div>
            {t('cta_secondary')}
          </Link>
        </motion.div>

        {/* Social proof micro-line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-6 mb-16 text-xs text-[hsl(var(--muted))]"
        >
          {['No credit card required', 'Free plan forever', '5 min setup'].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[hsl(var(--brand))]" />
              {item}
            </span>
          ))}
        </motion.div>

        {/* Product preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Reflection glow */}
          <div className="absolute -inset-6 bg-gradient-to-t from-transparent via-[hsl(var(--brand)/0.06)] to-[hsl(var(--brand)/0.12)] blur-2xl rounded-3xl" />

          {/* Mockup frame */}
          <div className="relative rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] overflow-hidden shadow-2xl shadow-black/20 card-shine">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 h-10 border-b border-[hsl(var(--border))] bg-[hsl(var(--surface-2))]">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 mx-3">
                <div className="h-5 max-w-[200px] mx-auto rounded-md bg-[hsl(var(--surface-3))] flex items-center justify-center gap-1.5 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                  <span className="text-[10px] text-[hsl(var(--muted))] font-mono">brainigen.com/dashboard</span>
                </div>
              </div>
              <div className="flex gap-2 opacity-40">
                <div className="h-2 w-6 rounded bg-[hsl(var(--border-strong))]" />
                <div className="h-2 w-6 rounded bg-[hsl(var(--border-strong))]" />
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
    { label: 'Active Agents', value: '12', change: '+2', up: true },
    { label: 'Messages Today', value: '4.2k', change: '+18%', up: true },
    { label: 'Revenue', value: '$8.2k', change: '+12%', up: true },
    { label: 'Uptime', value: '99.9%', change: '', up: true },
  ];

  const bars = [38, 62, 44, 78, 52, 88, 65, 82, 93, 70, 87, 95];
  const menuItems = [
    { label: 'Dashboard', active: true },
    { label: 'Agents', active: false },
    { label: 'Knowledge', active: false },
    { label: 'Analytics', active: false },
    { label: 'Billing', active: false },
  ];

  return (
    <div className="bg-[hsl(var(--surface))]">
      <div className="grid md:grid-cols-[180px_1fr]">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col border-r border-[hsl(var(--border))] p-3 gap-1 min-h-[360px] bg-[hsl(var(--surface-2)/0.5)]">
          <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
            <div className="w-5 h-5 rounded-md bg-[hsl(var(--brand))] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-semibold">Brainigen</span>
          </div>
          {menuItems.map((item) => (
            <div
              key={item.label}
              className={`h-7 rounded-md px-2.5 flex items-center text-[10px] transition-colors ${
                item.active
                  ? 'bg-[hsl(var(--brand)/0.12)] text-[hsl(var(--brand))] font-semibold'
                  : 'text-[hsl(var(--muted))]'
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="p-4 md:p-6 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] p-3">
                <div className="text-[9px] md:text-[10px] text-[hsl(var(--muted))] mb-1.5">{stat.label}</div>
                <div className="flex items-end justify-between">
                  <span className="text-sm md:text-lg font-bold">{stat.value}</span>
                  {stat.change && (
                    <span className="text-[9px] text-emerald-400 font-medium">{stat.change}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] text-[hsl(var(--muted))] font-medium">Agent activity — last 12h</div>
              <div className="flex gap-1">
                {['1h','12h','7d'].map((t, i) => (
                  <div key={t} className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${i === 1 ? 'bg-[hsl(var(--brand)/0.15)] text-[hsl(var(--brand))]' : 'text-[hsl(var(--muted))]'}`}>{t}</div>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-1 h-16 md:h-24">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    background: `linear-gradient(to top, hsl(var(--brand)/0.9), hsl(var(--brand)/0.4))`,
                    height: `${h}%`,
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.6 + i * 0.04, duration: 0.4, ease: 'easeOut' }}
                  style={{ height: `${h}%`, transformOrigin: 'bottom' }}
                />
              ))}
            </div>
          </div>

          {/* Activity rows */}
          <div className="hidden md:block space-y-2">
            {[
              { name: 'Support Bot v2', status: 'active', msgs: '1,204 msgs', color: 'bg-emerald-400' },
              { name: 'Sales Assistant', status: 'active', msgs: '847 msgs', color: 'bg-emerald-400' },
              { name: 'HR Onboarding', status: 'idle', msgs: '23 msgs', color: 'bg-amber-400' },
            ].map((agent) => (
              <div key={agent.name} className="flex items-center justify-between px-3 py-2 rounded-lg bg-[hsl(var(--surface-2))] border border-[hsl(var(--border))]">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${agent.color}`} />
                  <span className="text-[10px] font-medium">{agent.name}</span>
                </div>
                <span className="text-[10px] text-[hsl(var(--muted))]">{agent.msgs}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
