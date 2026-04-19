'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server, FileCheck, KeyRound } from 'lucide-react';

const badges = [
  { icon: Shield, label: 'SOC 2 Type II', status: 'In progress' },
  { icon: Lock, label: 'GDPR Compliant', status: 'Active' },
  { icon: Eye, label: 'HIPAA Ready', status: 'Active' },
  { icon: FileCheck, label: 'ISO 27001', status: 'In progress' },
  { icon: Server, label: 'CCPA Compliant', status: 'Active' },
  { icon: KeyRound, label: 'AES-256 Encryption', status: 'Active' },
];

export function SecurityBadges() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-narrow">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-h2 mb-4">Enterprise-grade security</h2>
          <p className="text-lead max-w-2xl mx-auto">Your data is protected by industry-leading security standards.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div key={b.label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4 text-center hover:border-[hsl(var(--border-strong))] transition-all">
                <Icon className="h-6 w-6 text-[hsl(var(--brand))] mx-auto mb-3" />
                <div className="text-xs font-semibold mb-1">{b.label}</div>
                <div className={`text-[10px] ${b.status === 'Active' ? 'text-emerald-500' : 'text-[hsl(var(--muted-2))]'}`}>{b.status}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
