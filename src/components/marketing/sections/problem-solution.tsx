'use client';

import { motion } from 'framer-motion';
import { Clock, AlertTriangle, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const problems = [
  'Manual customer support eating 40% of team bandwidth',
  'Slow response times hurting customer satisfaction',
  'Knowledge scattered across 10+ tools',
  'Scaling support means scaling headcount',
];

const solutions = [
  'AI agents handle 80% of queries autonomously',
  'Instant responses 24/7 in 50+ languages',
  'Unified knowledge base with RAG technology',
  'Scale to millions of conversations at flat cost',
];

export function ProblemSolution() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 mb-4">Stop burning hours on repetitive work</h2>
          <p className="text-lead max-w-2xl mx-auto">
            Your team deserves to focus on what matters. Let AI handle the rest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-red-500/20 bg-red-500/5 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">The Problem</h3>
                <p className="text-sm text-[hsl(var(--muted))]">What teams deal with today</p>
              </div>
            </div>
            <ul className="space-y-4">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-red-400 mt-1 shrink-0" />
                  <span className="text-sm text-[hsl(var(--muted))]">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-[hsl(var(--brand)/0.3)] bg-[hsl(var(--brand-soft))] p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-[hsl(var(--brand)/0.15)] flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[hsl(var(--brand))]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">The Solution</h3>
                <p className="text-sm text-[hsl(var(--muted))]">What Brainigen delivers</p>
              </div>
            </div>
            <ul className="space-y-4">
              {solutions.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--brand))] mt-1 shrink-0" />
                  <span className="text-sm text-[hsl(var(--muted))]">{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-[hsl(var(--brand)/0.15)]">
              <a href="/register" className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--brand))] hover:underline">
                Start building now <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
