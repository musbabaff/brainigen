'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    quote: 'Brainigen transformed our customer support. Response times dropped by 70% and satisfaction scores have never been higher.',
    name: 'Sarah Chen',
    role: 'VP of Operations',
    company: 'TechFlow Inc.',
    industry: 'SaaS',
    rating: 5,
  },
  {
    quote: "The AI agents handle thousands of conversations daily with remarkable accuracy. Best investment we've made this year.",
    name: 'Marcus Rodriguez',
    role: 'CTO',
    company: 'ScaleUp AI',
    industry: 'AI/ML',
    rating: 5,
  },
  {
    quote: "We deployed our first agent in 20 minutes. Within a week it was handling 60% of our support tickets autonomously.",
    name: 'Elena Kowalski',
    role: 'Head of Innovation',
    company: 'NovaBridge',
    industry: 'Fintech',
    rating: 5,
  },
  {
    quote: 'The analytics alone are worth the price. We finally understand what our customers actually need.',
    name: 'James Park',
    role: 'Product Manager',
    company: 'CloudSync',
    industry: 'Cloud',
    rating: 5,
  },
  {
    quote: "Multi-language support was critical for us. Brainigen's agents handle 12 languages fluently.",
    name: 'Aisha Patel',
    role: 'Global Support Lead',
    company: 'Nextera',
    industry: 'E-commerce',
    rating: 5,
  },
  {
    quote: "We tried building in-house for 6 months. Switched to Brainigen and deployed in a day.",
    name: 'David Kim',
    role: 'Engineering Manager',
    company: 'DataVault',
    industry: 'Data',
    rating: 5,
  },
];

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('');
  const colors = [
    'from-violet-500 to-indigo-600',
    'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
    'from-purple-500 to-violet-600',
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
      {initials}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-[hsl(var(--surface-2))]">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-xs text-[hsl(var(--muted))] mb-4">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            4.9/5 from 200+ reviews
          </div>
          <h2 className="text-h2 mb-4">Loved by teams worldwide</h2>
          <p className="text-lead max-w-xl mx-auto">
            See what our customers say about building with Brainigen.
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5, ease }}
              className="break-inside-avoid rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 hover:border-[hsl(var(--border-strong))] hover:shadow-lg hover:shadow-black/5 transition-all duration-300 cursor-default"
            >
              {/* Quote icon */}
              <Quote className="h-5 w-5 text-[hsl(var(--brand)/0.4)] mb-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm leading-relaxed text-[hsl(var(--fg)/0.85)] mb-5">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar name={t.name} />
                <div className="min-w-0">
                  <div className="text-sm font-semibold leading-tight">{t.name}</div>
                  <div className="text-xs text-[hsl(var(--muted))] truncate">{t.role}, {t.company}</div>
                </div>
                <span className="ml-auto text-[10px] rounded-full border border-[hsl(var(--border))] px-2 py-0.5 text-[hsl(var(--muted-2))] shrink-0">
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
