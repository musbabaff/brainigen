'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, TrendingUp, Zap, Shield } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

function MeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base dark */}
      <div className="absolute inset-0 bg-[hsl(var(--bg))]" />
      {/* Brand orb — top center */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[hsl(var(--brand)/0.07)] blur-[120px]" />
      {/* Violet — top right */}
      <div className="absolute top-[0%] right-[-10%] w-[500px] h-[400px] rounded-full bg-violet-600/5 blur-[100px]" />
      {/* Blue — bottom left */}
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[300px] rounded-full bg-blue-600/5 blur-[100px]" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--fg)) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  );
}

const floatingStats = [
  { icon: TrendingUp, label: 'Response rate', value: '+70%', color: 'text-emerald-400' },
  { icon: Zap, label: 'Avg. setup time', value: '5 min', color: 'text-[hsl(var(--brand))]' },
  { icon: Shield, label: 'Uptime SLA', value: '99.99%', color: 'text-blue-400' },
];

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-[calc(100svh-80px)] flex flex-col justify-center pb-20 lg:pb-28 overflow-hidden">
      <MeshBackground />

      <div className="container-narrow relative z-10">
        {/* Two-column grid on large screens */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20 items-center">

          {/* ── Left column ── */}
          <div className="flex flex-col items-start">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-2 mb-8"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[hsl(var(--brand))]">
                <Sparkles className="h-3 w-3" />
                AI Agent Platform
              </span>
              <span className="h-px w-8 bg-[hsl(var(--brand)/0.4)]" />
              <span className="text-[10px] text-[hsl(var(--muted))] uppercase tracking-widest font-medium">Now in Beta</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="font-semibold leading-[1.03] tracking-[-0.04em] text-[clamp(2.8rem,5vw+0.5rem,4.5rem)] mb-6"
            >
              <span className="block text-[hsl(var(--fg))]">Build AI agents</span>
              <span className="block text-[hsl(var(--fg))]">that actually</span>
              <span className="block bg-gradient-to-r from-[hsl(var(--brand))] via-violet-400 to-blue-500 bg-clip-text text-transparent">
                get things done.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="text-[hsl(var(--muted))] text-base lg:text-lg leading-relaxed max-w-[440px] mb-10"
            >
              Deploy intelligent AI agents for customer support, sales, and operations — with no engineering team required.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease }}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-[hsl(var(--brand))] text-white text-sm font-semibold hover:bg-[hsl(var(--brand)/0.9)] active:scale-[0.97] transition-all shadow-[0_0_0_1px_hsl(var(--brand)/0.3),0_8px_24px_hsl(var(--brand)/0.25)] hover:shadow-[0_0_0_1px_hsl(var(--brand)/0.4),0_12px_32px_hsl(var(--brand)/0.35)] cursor-pointer"
              >
                Start for free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/demo"
                className="group inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--fg))] text-sm font-medium hover:border-[hsl(var(--border-strong))] hover:bg-[hsl(var(--surface-2))] transition-all cursor-pointer"
              >
                <span className="h-6 w-6 rounded-full bg-[hsl(var(--surface-2))] border border-[hsl(var(--border))] flex items-center justify-center">
                  <Play className="h-2.5 w-2.5 fill-current ml-0.5 text-[hsl(var(--brand))]" />
                </span>
                Watch demo
              </Link>
            </motion.div>

            {/* Floating stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {floatingStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08, ease }}
                    className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface)/0.6)] backdrop-blur-sm"
                  >
                    <Icon className={`h-3.5 w-3.5 ${stat.color}`} />
                    <div>
                      <div className="text-xs font-bold text-[hsl(var(--fg))]">{stat.value}</div>
                      <div className="text-[10px] text-[hsl(var(--muted))]">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* ── Right column — product mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 24, y: 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="relative hidden lg:block"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-8 bg-[hsl(var(--brand)/0.06)] blur-3xl rounded-3xl" />

            {/* Frame */}
            <div className="relative rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] overflow-hidden shadow-2xl shadow-black/30 ring-1 ring-white/5">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-4 h-9 border-b border-[hsl(var(--border))] bg-[hsl(var(--surface-2))]">
                <div className="h-2 w-2 rounded-full bg-red-400/60" />
                <div className="h-2 w-2 rounded-full bg-yellow-400/60" />
                <div className="h-2 w-2 rounded-full bg-emerald-400/60" />
                <div className="flex-1 mx-4">
                  <div className="h-4 max-w-[160px] mx-auto rounded bg-[hsl(var(--surface-3))] flex items-center justify-center px-2 gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400/70" />
                    <span className="text-[9px] text-[hsl(var(--muted))] font-mono">brainigen.com/dashboard</span>
                  </div>
                </div>
              </div>

              {/* Dashboard preview content */}
              <DashboardPreview />
            </div>

            {/* Floating "live" badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease }}
              className="absolute -bottom-4 -left-4 flex items-center gap-2 px-3 py-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] shadow-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold">12,400+ agents live</span>
            </motion.div>

            {/* Floating accuracy badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5, ease }}
              className="absolute -top-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] shadow-xl"
            >
              <span className="text-[hsl(var(--brand))] font-bold text-sm">99.2%</span>
              <span className="text-xs text-[hsl(var(--muted))]">accuracy</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile: product mockup below */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="lg:hidden mt-12 relative"
        >
          <div className="absolute -inset-4 bg-[hsl(var(--brand)/0.05)] blur-2xl rounded-3xl" />
          <div className="relative rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] overflow-hidden shadow-2xl shadow-black/20">
            <div className="flex items-center gap-1.5 px-3 h-8 border-b border-[hsl(var(--border))] bg-[hsl(var(--surface-2))]">
              <div className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-400/60" />
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
            </div>
            <DashboardPreview compact />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardPreview({ compact = false }: { compact?: boolean }) {
  const stats = [
    { label: 'Active Agents', value: '12', change: '+2', color: 'text-emerald-400' },
    { label: 'Messages Today', value: '4.2k', change: '+18%', color: 'text-emerald-400' },
    { label: 'Revenue', value: '$8.2k', change: '+12%', color: 'text-emerald-400' },
    { label: 'Uptime', value: '99.9%', change: '', color: 'text-[hsl(var(--brand))]' },
  ];

  const bars = [38, 52, 44, 71, 58, 84, 62, 88, 95, 76, 90, 97];
  const menuItems = [
    { label: 'Dashboard', active: true },
    { label: 'AI Agents', active: false },
    { label: 'Knowledge', active: false },
    { label: 'Analytics', active: false },
    { label: 'Settings', active: false },
  ];

  const agents = [
    { name: 'Support Bot v2', msgs: '1,204', status: 'active' },
    { name: 'Sales Assistant', msgs: '847', status: 'active' },
    { name: 'HR Onboarding', msgs: '23', status: 'idle' },
  ];

  return (
    <div className="bg-[hsl(var(--surface))]">
      <div className={`grid ${compact ? '' : 'md:grid-cols-[160px_1fr]'}`}>
        {/* Sidebar */}
        {!compact && (
          <div className="hidden md:flex flex-col border-r border-[hsl(var(--border))] p-3 gap-0.5 min-h-[380px] bg-[hsl(var(--surface-2)/0.4)]">
            <div className="flex items-center gap-2 px-2 py-2 mb-3">
              <div className="w-5 h-5 rounded-md bg-[hsl(var(--brand))] flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-[10px] font-bold tracking-tight">Brainigen</span>
            </div>
            {menuItems.map((item) => (
              <div
                key={item.label}
                className={`h-7 rounded-lg px-2.5 flex items-center text-[10px] ${
                  item.active
                    ? 'bg-[hsl(var(--brand)/0.1)] text-[hsl(var(--brand))] font-semibold'
                    : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]'
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}

        {/* Main */}
        <div className={`${compact ? 'p-4' : 'p-4 md:p-5'} space-y-3`}>
          {/* Stat cards */}
          <div className={`grid gap-2 ${compact ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] px-3 py-2.5"
              >
                <div className="text-[9px] text-[hsl(var(--muted))] mb-1.5 font-medium">{stat.label}</div>
                <div className="flex items-end justify-between gap-1">
                  <span className="text-sm font-bold leading-none">{stat.value}</span>
                  {stat.change && (
                    <span className={`text-[9px] font-semibold leading-none ${stat.color}`}>{stat.change}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-semibold text-[hsl(var(--muted))]">Agent activity · last 12h</span>
              <div className="flex gap-0.5">
                {['1h', '12h', '7d'].map((t, i) => (
                  <div
                    key={t}
                    className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${
                      i === 1 ? 'bg-[hsl(var(--brand)/0.12)] text-[hsl(var(--brand))]' : 'text-[hsl(var(--muted))]'
                    }`}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className={`flex items-end gap-1 ${compact ? 'h-14' : 'h-16 md:h-20'}`}>
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    background: `linear-gradient(to top, hsl(var(--brand)), hsl(var(--brand)/0.35))`,
                    height: `${h}%`,
                    transformOrigin: 'bottom',
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.5 + i * 0.04, duration: 0.4, ease: 'easeOut' }}
                />
              ))}
            </div>
          </div>

          {/* Agent list */}
          {!compact && (
            <div className="hidden md:flex flex-col gap-1.5">
              {agents.map((agent) => (
                <div
                  key={agent.name}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))]"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      agent.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                  <span className="text-[10px] font-medium flex-1">{agent.name}</span>
                  <span className="text-[10px] text-[hsl(var(--muted))]">{agent.msgs} msgs</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
