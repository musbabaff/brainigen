'use client';

import { motion } from 'framer-motion';
import { Bot, Database, Mic, Zap, Shield, BarChart3, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    icon: Bot,
    title: 'AI Agent Builder',
    desc: 'Build sophisticated agents with a visual canvas. Define personas, set guardrails, connect tools — all without code.',
    span: 'lg:col-span-2 lg:row-span-2',
    gradient: 'from-[hsl(var(--brand)/0.15)] via-[hsl(var(--brand)/0.05)] to-transparent',
    accentColor: 'text-[hsl(var(--brand))]',
    bgIcon: 'bg-[hsl(var(--brand)/0.12)]',
    stat: { value: '10x', label: 'faster builds' },
    large: true,
  },
  {
    icon: Database,
    title: 'Knowledge Base',
    desc: 'RAG-powered retrieval with semantic search. Upload docs, scrape sites, connect APIs.',
    span: 'lg:col-span-2',
    gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    accentColor: 'text-emerald-400',
    bgIcon: 'bg-emerald-500/10',
    stat: { value: '99.2%', label: 'accuracy' },
  },
  {
    icon: Mic,
    title: 'Voice Agents',
    desc: 'Phone support with sub-second latency. IVR-ready, 40+ languages.',
    span: 'lg:col-span-1',
    gradient: 'from-violet-500/10 via-violet-500/5 to-transparent',
    accentColor: 'text-violet-400',
    bgIcon: 'bg-violet-500/10',
    badge: 'NEW',
  },
  {
    icon: Zap,
    title: 'Edge Inference',
    desc: '<200ms p95 latency worldwide. Zero cold starts.',
    span: 'lg:col-span-1',
    gradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
    accentColor: 'text-amber-400',
    bgIcon: 'bg-amber-500/10',
    stat: { value: '<200ms', label: 'p95 latency' },
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    desc: 'SOC 2 Type II, GDPR, HIPAA-ready. SSO, RBAC, audit logs.',
    span: 'lg:col-span-2',
    gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
    accentColor: 'text-blue-400',
    bgIcon: 'bg-blue-500/10',
    stat: { value: 'SOC 2', label: 'certified' },
  },
  {
    icon: BarChart3,
    title: 'Deep Analytics',
    desc: 'Track conversations, measure satisfaction, optimize prompts in real time.',
    span: 'lg:col-span-2',
    gradient: 'from-rose-500/10 via-rose-500/5 to-transparent',
    accentColor: 'text-rose-400',
    bgIcon: 'bg-rose-500/10',
    stat: { value: '360°', label: 'visibility' },
  },
];

function BarChart() {
  const bars = [40, 65, 45, 80, 55, 90, 70, 85, 95, 72];
  return (
    <div className="absolute bottom-6 right-6 flex items-end gap-1 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-sm bg-[hsl(var(--brand))]"
          style={{ height: `${h * 0.4}px` }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.04, duration: 0.4, ease: 'easeOut' }}
          style={{ height: `${h * 0.4}px`, originY: 1 }}
        />
      ))}
    </div>
  );
}

function AgentNodes() {
  const nodes = [
    { x: 50, y: 20, size: 6, delay: 0 },
    { x: 20, y: 60, size: 5, delay: 0.2 },
    { x: 80, y: 55, size: 5, delay: 0.4 },
    { x: 35, y: 80, size: 4, delay: 0.6 },
    { x: 65, y: 78, size: 4, delay: 0.8 },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,4],[1,4]];

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full opacity-20 group-hover:opacity-40 transition-opacity duration-500" viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="hsl(var(--brand))"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x} cy={n.y} r={n.size / 4}
            fill="hsl(var(--brand))"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ delay: n.delay, type: 'spring', stiffness: 300 }}
          />
        ))}
      </svg>
    </div>
  );
}

export function FeaturesBento() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] text-xs text-[hsl(var(--muted))] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--brand))] animate-pulse" />
            Platform capabilities
          </div>
          <h2 className="text-h2 mb-4">Everything you need to build AI agents</h2>
          <p className="text-lead max-w-2xl mx-auto">
            A complete platform for building, deploying, and managing intelligent AI agents at scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease }}
                className={cn(
                  'group relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))]',
                  'p-6 transition-all duration-300',
                  'hover:border-[hsl(var(--border-strong))] hover:shadow-xl hover:shadow-black/10',
                  'cursor-pointer',
                  f.span
                )}
              >
                {/* Gradient background */}
                <div className={cn('absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-100 transition-opacity duration-500', f.gradient)} />

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                {/* Feature-specific visual for large card */}
                {f.large && <AgentNodes />}
                {f.title === 'Deep Analytics' && <BarChart />}

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center ring-1 ring-[hsl(var(--border))]', f.bgIcon)}>
                      <Icon className={cn('h-5 w-5', f.accentColor)} />
                    </div>
                    {f.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[hsl(var(--brand))] text-white shadow-[0_2px_8px_hsl(var(--brand)/0.4)]">
                        {f.badge}
                      </span>
                    )}
                    {f.stat && (
                      <div className="text-right">
                        <div className={cn('text-lg font-bold leading-none', f.accentColor)}>{f.stat.value}</div>
                        <div className="text-[10px] text-[hsl(var(--muted))] mt-0.5">{f.stat.label}</div>
                      </div>
                    )}
                  </div>

                  <div className={cn('mt-auto', f.large && 'mt-8')}>
                    <h3 className="font-semibold text-[hsl(var(--fg))] mb-2 text-base lg:text-lg">{f.title}</h3>
                    <p className="text-sm text-[hsl(var(--muted))] leading-relaxed">{f.desc}</p>

                    {f.large && (
                      <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--brand))] group-hover:gap-2.5 transition-all duration-200">
                        Start building free
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    )}
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
