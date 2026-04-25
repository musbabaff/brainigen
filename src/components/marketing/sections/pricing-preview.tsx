'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    desc: 'Perfect for testing and small projects.',
    features: [
      '1 AI agent',
      '100 messages/month',
      'Community support',
      'Basic analytics',
      'Public API access',
    ],
    cta: 'Start Free',
    href: '/register',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: { monthly: 49, annual: 39 },
    desc: 'For growing teams and businesses.',
    features: [
      '10 AI agents',
      '50k messages/month',
      'Priority email support',
      'Advanced analytics',
      'Knowledge base (RAG)',
      'Custom branding',
      'Webhooks & integrations',
    ],
    cta: 'Start Pro Trial',
    href: '/register?plan=pro',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Business',
    price: { monthly: 199, annual: 159 },
    desc: 'For enterprises and power users.',
    features: [
      'Unlimited agents',
      '500k messages/month',
      'Dedicated support',
      'Custom models (BYOM)',
      'Full API access',
      'SSO & RBAC',
      'SLA guarantee',
      'Custom contracts',
    ],
    cta: 'Start Business Trial',
    href: '/register?plan=business',
    highlighted: false,
  },
];

export function PricingPreview() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[hsl(var(--surface-2))] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[hsl(var(--brand)/0.06)] blur-3xl rounded-full pointer-events-none" />

      <div className="container-narrow relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-xs text-[hsl(var(--muted))] mb-4">
            <Zap className="h-3 w-3 text-[hsl(var(--brand))]" />
            Simple pricing
          </div>
          <h2 className="text-h2 mb-4">Start free, scale as you grow</h2>
          <p className="text-lead max-w-lg mx-auto mb-8">
            No hidden fees, no long-term commitments. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                'px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
                !annual
                  ? 'bg-[hsl(var(--fg))] text-[hsl(var(--bg))] shadow-sm'
                  : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                'px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2',
                annual
                  ? 'bg-[hsl(var(--fg))] text-[hsl(var(--bg))] shadow-sm'
                  : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]'
              )}
            >
              Annual
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500">-20%</span>
            </button>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease }}
              className={cn(
                'relative rounded-2xl border p-6 flex flex-col transition-all duration-300',
                plan.highlighted
                  ? 'border-[hsl(var(--brand)/0.5)] bg-[hsl(var(--surface))] shadow-[0_0_0_1px_hsl(var(--brand)/0.2),0_20px_40px_hsl(var(--brand)/0.08)]'
                  : 'border-[hsl(var(--border))] bg-[hsl(var(--surface))] hover:border-[hsl(var(--border-strong))]'
              )}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[hsl(var(--brand))] text-white shadow-[0_2px_8px_hsl(var(--brand)/0.4)]">
                    <Zap className="h-2.5 w-2.5" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Gradient top on highlighted */}
              {plan.highlighted && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand)/0.6)] to-transparent rounded-t-2xl" />
              )}

              <div className="mb-5">
                <h3 className="font-semibold text-base mb-1">{plan.name}</h3>
                <p className="text-sm text-[hsl(var(--muted))]">{plan.desc}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={annual ? 'annual' : 'monthly'}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-end gap-1"
                  >
                    <span className="text-4xl font-bold tracking-tight">
                      ${annual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-sm text-[hsl(var(--muted))] mb-1">/mo</span>
                  </motion.div>
                </AnimatePresence>
                {annual && plan.price.annual > 0 && (
                  <p className="text-xs text-emerald-500 font-medium mt-1">
                    Save ${(plan.price.monthly - plan.price.annual) * 12}/year
                  </p>
                )}
              </div>

              {/* CTA */}
              <Link
                href={plan.href}
                className={cn(
                  'w-full inline-flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer mb-6 group',
                  plan.highlighted
                    ? 'bg-[hsl(var(--brand))] text-white hover:opacity-90 shadow-[0_2px_12px_hsl(var(--brand)/0.35)]'
                    : 'border border-[hsl(var(--border))] hover:bg-[hsl(var(--surface-2))] hover:border-[hsl(var(--border-strong))]'
                )}
              >
                {plan.cta}
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Features */}
              <ul className="space-y-2.5 mt-auto">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <div className={cn(
                      'h-4 w-4 rounded-full flex items-center justify-center shrink-0',
                      plan.highlighted ? 'bg-[hsl(var(--brand)/0.15)]' : 'bg-[hsl(var(--surface-2))]'
                    )}>
                      <Check className={cn('h-2.5 w-2.5', plan.highlighted ? 'text-[hsl(var(--brand))]' : 'text-[hsl(var(--muted))]')} />
                    </div>
                    <span className="text-[hsl(var(--muted))]">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Enterprise note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-[hsl(var(--muted))] mt-8"
        >
          Need custom enterprise pricing?{' '}
          <Link href="/contact" className="text-[hsl(var(--brand))] font-medium hover:underline">
            Contact sales →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
