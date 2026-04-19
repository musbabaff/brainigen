'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand)/0.08)] via-transparent to-purple-500/5 pointer-events-none" />
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />

      <div className="container-narrow relative text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-h1 mb-4">Ready to build your AI future?</h2>
          <p className="text-lead max-w-xl mx-auto mb-10">
            Join thousands of teams using Brainigen to automate workflows, delight customers, and scale operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register"
              className="group inline-flex items-center justify-center gap-2 h-12 px-8 bg-[hsl(var(--fg))] text-[hsl(var(--bg))] rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99]">
              Start free trial <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/demo"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 border border-[hsl(var(--border))] bg-[hsl(var(--surface)/0.5)] backdrop-blur rounded-lg text-sm font-medium hover:border-[hsl(var(--border-strong))] transition-all">
              Book a demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
