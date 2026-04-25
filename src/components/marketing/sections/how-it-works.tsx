'use client';

import { motion } from 'framer-motion';
import { Layers, Upload, Sliders, Rocket } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    icon: Layers,
    num: '01',
    title: 'Pick a template',
    desc: 'Choose from 20+ production-ready agent templates or start from a blank canvas.',
    color: 'text-[hsl(var(--brand))]',
    bg: 'bg-[hsl(var(--brand)/0.08)]',
    border: 'border-[hsl(var(--brand)/0.2)]',
  },
  {
    icon: Upload,
    num: '02',
    title: 'Add your knowledge',
    desc: 'Upload documents, paste URLs, or connect APIs. RAG handles retrieval automatically.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/8',
    border: 'border-emerald-500/20',
  },
  {
    icon: Sliders,
    num: '03',
    title: 'Customize & configure',
    desc: 'Set tone, guardrails, escalation rules, and tool access — all from a visual interface.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/8',
    border: 'border-violet-500/20',
  },
  {
    icon: Rocket,
    num: '04',
    title: 'Deploy & scale',
    desc: 'Go live in one click. Monitor performance in real time and optimize continuously.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/8',
    border: 'border-blue-500/20',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-36">
      <div className="container-narrow">
        {/* Header — left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-20 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(var(--brand))] mb-4">How it works</p>
          <h2 className="text-h2 mb-5">
            From idea to live agent<br />
            <span className="text-[hsl(var(--muted))]">in four steps.</span>
          </h2>
          <p className="text-[hsl(var(--muted))] text-lg leading-relaxed">
            No complex setup. No engineering team required. Just results.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connecting line on large screens */}
          <div className="hidden lg:block absolute left-[19px] top-8 bottom-8 w-px bg-[hsl(var(--border))]" />

          <div className="flex flex-col gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease }}
                  className="group relative flex gap-6 lg:gap-10 items-start"
                >
                  {/* Step indicator */}
                  <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-xl border ${step.border} ${step.bg} flex items-center justify-center shadow-sm`}>
                    <Icon className={`h-4.5 w-4.5 ${step.color}`} />
                  </div>

                  {/* Content card */}
                  <div className="flex-1 grid lg:grid-cols-[1fr_2fr] gap-4 lg:gap-10 pb-6 border-b border-[hsl(var(--border))] last:border-0 last:pb-0">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-[0.15em] text-[hsl(var(--muted-2))] uppercase mb-1">Step {step.num}</span>
                      <h3 className="text-lg font-semibold leading-tight">{step.title}</h3>
                    </div>
                    <p className="text-[hsl(var(--muted))] leading-relaxed pt-0.5">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5, ease }}
          className="mt-16"
        >
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--brand))] hover:gap-3 transition-all duration-200"
          >
            Get started for free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
