'use client';

import { motion } from 'framer-motion';
import { FileText, Upload, Settings, Rocket } from 'lucide-react';

const steps = [
  { icon: FileText, title: 'Choose a template', desc: 'Pick from 20+ pre-built agent templates or start from scratch.' },
  { icon: Upload, title: 'Add your knowledge', desc: 'Upload docs, connect APIs, or paste URLs. We handle the rest.' },
  { icon: Settings, title: 'Customize behavior', desc: 'Set tone, guardrails, escalation rules, and tool access.' },
  { icon: Rocket, title: 'Deploy & scale', desc: 'Go live in one click. Monitor performance and optimize.' },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 mb-4">Up and running in 4 simple steps</h2>
          <p className="text-lead max-w-2xl mx-auto">
            No complex setup. No engineering team required. Just results.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-[hsl(var(--border-strong))]" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full border-2 border-[hsl(var(--brand))] bg-[hsl(var(--surface))] mb-4 relative z-10">
                  <span className="text-sm font-bold text-[hsl(var(--brand))]">{i + 1}</span>
                </div>
                <div className="h-10 w-10 rounded-lg bg-[hsl(var(--brand)/0.1)] flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-5 w-5 text-[hsl(var(--brand))]" />
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[hsl(var(--muted))] leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
