'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const ease = [0.16, 1, 0.3, 1] as const;

const trust = [
  'No credit card required',
  'Free plan forever',
  'SOC 2 certified',
  '99.99% uptime SLA',
];

export function FinalCTA() {
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden">
      {/* Rich background */}
      <div className="absolute inset-0 bg-[hsl(var(--bg))]" />
      {/* Brand glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[hsl(var(--brand)/0.07)] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-violet-600/4 blur-[80px] rounded-full pointer-events-none" />
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[hsl(var(--border))]" />
      {/* Top center gradient beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand)/0.6)] to-transparent" />

      <div className="container-narrow relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            {/* Label */}
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(var(--brand))] mb-6">
              Get started today
            </p>

            {/* Headline */}
            <h2 className="font-semibold leading-[1.03] tracking-[-0.04em] text-[clamp(2.4rem,4vw+0.5rem,4rem)] mb-6">
              Ready to build your<br />
              <span className="bg-gradient-to-r from-[hsl(var(--brand))] via-violet-400 to-blue-500 bg-clip-text text-transparent">
                AI future?
              </span>
            </h2>

            <p className="text-[hsl(var(--muted))] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Join thousands of teams using Brainigen to automate workflows, delight customers, and scale operations — without scaling headcount.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 h-13 px-8 rounded-xl bg-[hsl(var(--brand))] text-white text-sm font-semibold hover:bg-[hsl(var(--brand)/0.9)] active:scale-[0.97] transition-all shadow-[0_0_0_1px_hsl(var(--brand)/0.3),0_12px_32px_hsl(var(--brand)/0.3)] hover:shadow-[0_0_0_1px_hsl(var(--brand)/0.5),0_16px_40px_hsl(var(--brand)/0.4)] cursor-pointer"
                style={{ height: '52px' }}
              >
                Start free — no credit card
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--fg))] text-sm font-medium hover:border-[hsl(var(--border-strong))] hover:bg-[hsl(var(--surface-2))] transition-all cursor-pointer"
                style={{ height: '52px' }}
              >
                Book a live demo
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-5">
              {trust.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted))]">
                  <CheckCircle className="h-3.5 w-3.5 text-[hsl(var(--brand)/0.7)] shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
