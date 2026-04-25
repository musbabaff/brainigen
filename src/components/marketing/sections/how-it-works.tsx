'use client';

import { motion } from 'framer-motion';
import { FileText, Upload, Settings2, Rocket, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    icon: FileText,
    step: '01',
    title: 'Choose a template',
    desc: 'Pick from 20+ pre-built agent templates or start from scratch with a blank canvas.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: Upload,
    step: '02',
    title: 'Add your knowledge',
    desc: 'Upload docs, connect APIs, or paste URLs. RAG handles retrieval automatically.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Settings2,
    step: '03',
    title: 'Customize behavior',
    desc: 'Set tone, guardrails, escalation rules, and tool access with a visual interface.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Deploy & scale',
    desc: 'Go live in one click. Monitor performance in real time and optimize on the fly.',
    color: 'text-[hsl(var(--brand))]',
    bg: 'bg-[hsl(var(--brand)/0.1)]',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] text-xs text-[hsl(var(--muted))] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--brand))] animate-pulse" />
            How it works
          </div>
          <h2 className="text-h2 mb-4">Up and running in 4 steps</h2>
          <p className="text-lead max-w-xl mx-auto">
            No complex setup. No engineering team required. Just results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease }}
                className="relative group"
              >
                {/* Connector arrow (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-8 left-full z-10 w-4 items-center justify-center">
                    <ArrowRight className="h-3.5 w-3.5 text-[hsl(var(--border-strong))]" />
                  </div>
                )}

                <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 h-full hover:border-[hsl(var(--border-strong))] hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
                  {/* Step number */}
                  <div className="text-[10px] font-bold tracking-[0.15em] text-[hsl(var(--muted-2))] uppercase mb-4">
                    Step {step.step}
                  </div>

                  {/* Icon */}
                  <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center mb-4', step.bg)}>
                    <Icon className={cn('h-5 w-5', step.color)} />
                  </div>

                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-[hsl(var(--muted))] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-10"
        >
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--brand))] hover:underline cursor-pointer"
          >
            Start building for free
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
