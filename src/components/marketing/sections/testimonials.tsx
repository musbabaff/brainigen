'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    quote: 'Brainigen transformed our customer support overnight. Response times dropped 70%, satisfaction scores are at an all-time high.',
    name: 'Sarah Chen',
    role: 'VP of Operations',
    company: 'TechFlow Inc.',
    industry: 'SaaS',
    gradient: 'from-violet-500 to-indigo-600',
  },
  {
    quote: "The AI agents handle thousands of conversations daily with remarkable accuracy. Best investment we've made this year.",
    name: 'Marcus Rodriguez',
    role: 'CTO',
    company: 'ScaleUp AI',
    industry: 'AI/ML',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    quote: "We deployed our first agent in 20 minutes. Within a week it was handling 60% of our support tickets autonomously.",
    name: 'Elena Kowalski',
    role: 'Head of Innovation',
    company: 'NovaBridge',
    industry: 'Fintech',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    quote: 'The analytics alone are worth the price. We finally understand what our customers actually need.',
    name: 'James Park',
    role: 'Product Manager',
    company: 'CloudSync',
    industry: 'Cloud',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    quote: "Multi-language support was critical for us. Brainigen's agents handle 12 languages fluently — no extra configuration.",
    name: 'Aisha Patel',
    role: 'Global Support Lead',
    company: 'Nextera',
    industry: 'E-commerce',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    quote: "We tried building in-house for 6 months. Switched to Brainigen and deployed in a single afternoon.",
    name: 'David Kim',
    role: 'Engineering Manager',
    company: 'DataVault',
    industry: 'Data',
    gradient: 'from-purple-500 to-violet-600',
  },
];

function Avatar({ name, gradient }: { name: string; gradient: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('');
  return (
    <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg`}>
      {initials}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[hsl(var(--surface-2)/0.4)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-[hsl(var(--border))]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[hsl(var(--border))]" />

      <div className="container-narrow relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-20 max-w-xl"
        >
          <div className="flex items-center gap-1 mb-4">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs text-[hsl(var(--muted))] ml-2 font-medium">4.9 / 5 from 200+ reviews</span>
          </div>
          <h2 className="text-h2 mb-4">
            Loved by teams<br />
            <span className="text-[hsl(var(--muted))]">shipping faster.</span>
          </h2>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease }}
              className="break-inside-avoid rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 hover:border-[hsl(var(--border-strong))] hover:shadow-xl hover:shadow-black/10 transition-all duration-300 cursor-default"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm leading-relaxed text-[hsl(var(--fg)/0.85)] mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar name={t.name} gradient={t.gradient} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold leading-tight truncate">{t.name}</div>
                  <div className="text-xs text-[hsl(var(--muted))] truncate">{t.role}, {t.company}</div>
                </div>
                <span className="text-[9px] font-medium uppercase tracking-wider rounded-full border border-[hsl(var(--border))] px-2 py-0.5 text-[hsl(var(--muted-2))] shrink-0">
                  {t.industry}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
