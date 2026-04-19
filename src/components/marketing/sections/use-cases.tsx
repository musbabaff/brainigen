'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Code2, Briefcase, Heart, GraduationCap, Home, ArrowRight } from 'lucide-react';

const useCases = [
  { icon: ShoppingCart, title: 'E-commerce', desc: 'Product recommendations, order tracking, returns, and 24/7 multilingual support.' },
  { icon: Code2, title: 'SaaS', desc: 'Customer onboarding, feature walkthroughs, support deflection, and churn prevention.' },
  { icon: Briefcase, title: 'Agencies', desc: 'White-label AI agents for your clients. Managed service with your branding.' },
  { icon: Heart, title: 'Healthcare', desc: 'Patient intake, appointment scheduling, FAQ handling, and HIPAA-compliant conversations.' },
  { icon: GraduationCap, title: 'Education', desc: 'Student tutoring, administrative queries, enrollment assistance, and personalized learning.' },
  { icon: Home, title: 'Real Estate', desc: 'Lead qualification, property search, scheduling viewings, and mortgage pre-qualification.' },
];

export function UseCases() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-narrow">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-h2 mb-4">Built for every industry</h2>
          <p className="text-lead max-w-2xl mx-auto">AI agents tailored to your specific business needs and workflows.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <motion.div key={uc.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 hover:border-[hsl(var(--border-strong))] hover:shadow-sm transition-all">
                <div className="h-10 w-10 rounded-lg bg-[hsl(var(--brand)/0.1)] flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-[hsl(var(--brand))]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{uc.title}</h3>
                <p className="text-sm text-[hsl(var(--muted))] leading-relaxed mb-4">{uc.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--brand))] group-hover:underline">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
