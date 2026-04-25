'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const ease = [0.16, 1, 0.3, 1] as const;

export function FinalCTA() {
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand)/0.08)] via-transparent to-violet-500/5 pointer-events-none" />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[hsl(var(--brand)/0.12)] blur-3xl rounded-full pointer-events-none" />

      {/* Top beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand)/0.5)] to-transparent" />

      <div className="container-narrow relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[hsl(var(--brand)/0.3)] bg-[hsl(var(--brand)/0.08)] text-sm text-[hsl(var(--brand))] font-medium mb-8"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Get started in 5 minutes
          </motion.div>

          <h2 className="text-display mb-6 max-w-3xl mx-auto">
            Ready to build your{' '}
            <span className="bg-gradient-to-r from-[hsl(var(--brand))] via-violet-400 to-[hsl(var(--brand))] bg-clip-text text-transparent bg-[length:200%] animate-[gradient-flow_4s_ease_infinite]">
              AI future?
            </span>
          </h2>

          <p className="text-lead max-w-xl mx-auto mb-10">
            Join thousands of teams using Brainigen to automate workflows, delight customers,
            and scale operations — without scaling headcount.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 h-12 px-8 bg-[hsl(var(--fg))] text-[hsl(var(--bg))] rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Start free — no credit card
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 border border-[hsl(var(--border))] bg-[hsl(var(--surface)/0.6)] backdrop-blur-sm rounded-xl text-sm font-medium hover:border-[hsl(var(--border-strong))] hover:bg-[hsl(var(--surface-2))] transition-all cursor-pointer"
            >
              Book a live demo
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[hsl(var(--muted))]">
            {['No credit card required', 'Free plan forever', 'SOC 2 certified', '99.99% uptime SLA'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[hsl(var(--brand)/0.6)]" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
