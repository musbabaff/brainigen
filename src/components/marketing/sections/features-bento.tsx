'use client';

import { motion } from 'framer-motion';
import { Bot, Database, Mic, Zap, Shield, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI Agent Builder',
    desc: 'Build sophisticated agents with a visual canvas. Define personas, set guardrails, connect tools — all without code.',
    span: 'col-span-2 row-span-2',
  },
  {
    icon: Database,
    title: 'Knowledge Base',
    desc: 'Upload docs, connect APIs, scrape websites. RAG-powered retrieval gives agents accurate, grounded answers.',
    span: 'col-span-2',
  },
  {
    icon: Mic,
    title: 'Voice Agents',
    desc: 'Deploy voice-enabled agents for phone support and IVR. Sub-second latency.',
    span: 'col-span-1',
    badge: 'NEW',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Edge-optimized inference with <200ms p95 latency worldwide.',
    span: 'col-span-1',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    desc: 'SOC 2, GDPR, HIPAA-ready. End-to-end encryption, SSO, role-based access control.',
    span: 'col-span-2',
  },
  {
    icon: BarChart3,
    title: 'Deep Analytics',
    desc: 'Track conversations, measure satisfaction, monitor costs, optimize prompts — all in real time.',
    span: 'col-span-2',
  },
];

export function FeaturesBento() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 mb-4">Everything you need to build AI agents</h2>
          <p className="text-lead max-w-2xl mx-auto">
            A complete platform for building, deploying, and managing intelligent AI agents at scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`${f.span} group relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 hover:border-[hsl(var(--border-strong))] hover:scale-[1.01] transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--brand)/0.1)] flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[hsl(var(--brand))]" />
                  </div>
                  {f.badge && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[hsl(var(--brand))] text-white">
                      {f.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-[hsl(var(--muted))] leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
