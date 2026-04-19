'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    desc: 'Perfect for testing and small projects.',
    features: ['1 AI agent', '100 messages/month', 'Community support', 'Basic analytics'],
    cta: 'Start Free',
    href: '/register',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: { monthly: 49, annual: 39 },
    desc: 'For growing teams and businesses.',
    features: ['10 AI agents', '50k messages/month', 'Priority email support', 'Advanced analytics', 'Knowledge base (RAG)', 'Custom branding'],
    cta: 'Start Pro Trial',
    href: '/register?plan=pro',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Business',
    price: { monthly: 199, annual: 159 },
    desc: 'For enterprises and power users.',
    features: ['Unlimited agents', '500k messages/month', 'Dedicated support', 'Custom models (BYOM)', 'Full API access', 'SSO & RBAC', 'SLA guarantee'],
    cta: 'Start Business Trial',
    href: '/register?plan=business',
    highlighted: false,
  },
];

export function PricingPreview() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-20 lg:py-28 bg-[hsl(var(--surface-2))]">
      <div className="container-narrow">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-h2 mb-4">Simple, transparent pricing</h2>
          <p className="text-lead max-w-2xl mx-auto mb-8">Start free, scale as you grow. No hidden fees, cancel anytime.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-[hsl(var(--surface))] border border-[hsl(var(--border))] rounded-full p-1">
            <button onClick={() => setAnnual(false)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${!annual ? 'bg-[hsl(var(--fg))] text-[hsl(var(--bg))]' : 'text-[hsl(var(--muted))]'}`}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${annual ? 'bg-[hsl(var(--fg))] text-[hsl(var(--bg))]' : 'text-[hsl(var(--muted))]'}`}>Annual <span className="text-emerald-500 text-xs">-20%</span></button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`relative rounded-xl border p-6 ${plan.highlighted
                ? 'border-[hsl(var(--brand))] bg-[hsl(var(--surface))] shadow-lg shadow-[hsl(var(--brand)/0.1)]'
                : 'border-[hsl(var(--border))] bg-[hsl(var(--surface))]'}`}>
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[hsl(var(--brand))] text-white">{plan.badge}</span>
              )}
              <h3 className="font-semibold text-lg mb-1">{plan.name}</h3>
              <p className="text-sm text-[hsl(var(--muted))] mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">${annual ? plan.price.annual : plan.price.monthly}</span>
                <span className="text-[hsl(var(--muted))] text-sm">/mo</span>
              </div>
              <Link href={plan.href}
                className={`w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-medium transition-all cursor-pointer mb-6 ${plan.highlighted
                  ? 'bg-[hsl(var(--brand))] text-white hover:opacity-90'
                  : 'border border-[hsl(var(--border))] hover:bg-[hsl(var(--surface-2))]'}`}>
                {plan.cta} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <ul className="space-y-2.5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-[hsl(var(--brand))] shrink-0" />
                    <span className="text-[hsl(var(--muted))]">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8">
          <p className="text-sm text-[hsl(var(--muted))]">Need custom enterprise pricing? <Link href="/contact" className="text-[hsl(var(--brand))] font-medium hover:underline">Contact sales</Link></p>
        </motion.div>
      </div>
    </section>
  );
}
