'use client';

import { motion } from 'framer-motion';
import { Bot, Database, Mic, Zap, Shield, BarChart3, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    icon: Bot,
    title: 'AI Agent Builder',
    desc: 'Visual canvas for building sophisticated agents. Define personas, set guardrails, connect tools — zero code required.',
    span: 'lg:col-span-2 lg:row-span-2',
    accent: 'from-[hsl(var(--brand)/0.25)] to-violet-500/10',
    border: 'from-[hsl(var(--brand)/0.5)] via-violet-500/20 to-transparent',
    iconColor: 'text-[hsl(var(--brand))]',
    iconBg: 'bg-[hsl(var(--brand)/0.1)]',
    stat: { value: '10x', label: 'faster to build' },
    large: true,
    cta: true,
  },
  {
    icon: Database,
    title: 'Knowledge Base',
    desc: 'RAG-powered retrieval with semantic search. Upload docs, scrape sites, connect APIs in minutes.',
    span: 'lg:col-span-2',
    accent: 'from-emerald-500/15 to-teal-500/5',
    border: 'from-emerald-500/40 via-teal-500/15 to-transparent',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    stat: { value: '99.2%', label: 'retrieval accuracy' },
  },
  {
    icon: Mic,
    title: 'Voice Agents',
    desc: 'Phone support with sub-second latency. IVR-ready, 40+ languages supported out of the box.',
    span: 'lg:col-span-1',
    accent: 'from-violet-500/15 to-purple-500/5',
    border: 'from-violet-500/40 via-purple-500/15 to-transparent',
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    badge: 'NEW',
  },
  {
    icon: Zap,
    title: 'Edge Inference',
    desc: '<200ms p95 latency worldwide. Zero cold starts, always-on reliability.',
    span: 'lg:col-span-1',
    accent: 'from-amber-500/15 to-orange-500/5',
    border: 'from-amber-500/40 via-orange-500/15 to-transparent',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    stat: { value: '<200ms', label: 'p95 latency' },
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    desc: 'SOC 2 Type II, GDPR, HIPAA-ready. SSO, RBAC, and full audit logs included.',
    span: 'lg:col-span-2',
    accent: 'from-blue-500/15 to-cyan-500/5',
    border: 'from-blue-500/40 via-cyan-500/15 to-transparent',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    stat: { value: 'SOC 2', label: 'Type II certified' },
  },
  {
    icon: BarChart3,
    title: 'Deep Analytics',
    desc: 'Track conversations, measure CSAT, optimize prompts with real-time dashboards.',
    span: 'lg:col-span-2',
    accent: 'from-rose-500/15 to-pink-500/5',
    border: 'from-rose-500/40 via-pink-500/15 to-transparent',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10',
    stat: { value: '360°', label: 'full visibility' },
  },
];

function AnimatedBars() {
  const bars = [40, 65, 45, 80, 55, 90, 70, 85, 95, 72];
  return (
    <div className="absolute bottom-5 right-5 flex items-end gap-1 opacity-20 group-hover:opacity-50 transition-opacity duration-500">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-sm bg-rose-400"
          style={{ height: `${h * 0.38}px`, transformOrigin: 'bottom' }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.04, duration: 0.4, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

function NodeGraph() {
  const nodes = [
    { x: 50, y: 18, r: 5 },
    { x: 22, y: 58, r: 4 },
    { x: 78, y: 52, r: 4 },
    { x: 36, y: 82, r: 3.5 },
    { x: 66, y: 80, r: 3.5 },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,4],[1,4]];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full opacity-15 group-hover:opacity-35 transition-opacity duration-500" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="hsl(var(--brand))"
            strokeWidth="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.7 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x} cy={n.y} r={n.r / 3.5}
            fill="hsl(var(--brand))"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, type: 'spring', stiffness: 250 }}
          />
        ))}
      </svg>
    </div>
  );
}

export function FeaturesBento() {
  return (
    <section className="py-24 lg:py-36">
      <div className="container-narrow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(var(--brand))] mb-4">
            Platform
          </p>
          <h2 className="text-h2 mb-5">
            Everything you need.<br />
            <span className="text-[hsl(var(--muted))]">Nothing you don't.</span>
          </h2>
          <p className="text-[hsl(var(--muted))] text-lg leading-relaxed">
            A complete platform for building, deploying, and managing intelligent AI agents — from prototype to production.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease }}
                className={cn('group relative', f.span)}
              >
                {/* Gradient border wrapper */}
                <div className={cn(
                  'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10',
                  f.border
                )} style={{ padding: '1px' }} />

                <div className={cn(
                  'relative h-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 overflow-hidden',
                  'hover:border-[hsl(var(--border-strong))] transition-all duration-300 cursor-pointer',
                  'group-hover:shadow-2xl group-hover:shadow-black/20'
                )}>
                  {/* Gradient fill */}
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
                    f.accent
                  )} />

                  {/* Decorative visuals */}
                  {f.large && <NodeGraph />}
                  {f.title === 'Deep Analytics' && <AnimatedBars />}

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center ring-1 ring-[hsl(var(--border))]', f.iconBg)}>
                        <Icon className={cn('h-5 w-5', f.iconColor)} />
                      </div>
                      {f.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[hsl(var(--brand))] text-white shadow-[0_2px_8px_hsl(var(--brand)/0.4)]">
                          {f.badge}
                        </span>
                      )}
                      {f.stat && (
                        <div className="text-right">
                          <div className={cn('text-lg font-bold leading-none', f.iconColor)}>{f.stat.value}</div>
                          <div className="text-[10px] text-[hsl(var(--muted))] mt-0.5">{f.stat.label}</div>
                        </div>
                      )}
                    </div>

                    <div className={cn('flex flex-col', f.large ? 'mt-auto' : 'mt-auto')}>
                      <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                      <p className="text-sm text-[hsl(var(--muted))] leading-relaxed">{f.desc}</p>

                      {f.cta && (
                        <Link
                          href="/register"
                          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--brand))] group-hover:gap-2.5 transition-all duration-200"
                        >
                          Start building free
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
