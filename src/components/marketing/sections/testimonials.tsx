'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { quote: 'Brainigen transformed our customer support. Response times dropped by 70% and satisfaction scores have never been higher.', name: 'Sarah Chen', role: 'VP of Operations', company: 'TechFlow Inc.', industry: 'SaaS' },
  { quote: "The AI agents handle thousands of conversations daily with remarkable accuracy. Best investment we've made this year.", name: 'Marcus Rodriguez', role: 'CTO', company: 'ScaleUp AI', industry: 'AI/ML' },
  { quote: "We deployed our first agent in 20 minutes. Within a week it was handling 60% of our support tickets autonomously.", name: 'Elena Kowalski', role: 'Head of Innovation', company: 'NovaBridge', industry: 'Fintech' },
  { quote: 'The analytics alone are worth the price. We finally understand what our customers actually need, backed by real conversation data.', name: 'James Park', role: 'Product Manager', company: 'CloudSync', industry: 'Cloud' },
  { quote: "Multi-language support was critical for us. Brainigen's agents handle 12 languages fluently — our global team is thrilled.", name: 'Aisha Patel', role: 'Global Support Lead', company: 'Nextera', industry: 'E-commerce' },
  { quote: "We tried building in-house for 6 months. Switched to Brainigen and deployed in a day. Should've started here.", name: 'David Kim', role: 'Engineering Manager', company: 'DataVault', industry: 'Data' },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-[hsl(var(--surface-2))]">
      <div className="container-narrow">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-h2 mb-4">Loved by teams worldwide</h2>
          <p className="text-lead max-w-2xl mx-auto">See what our customers have to say about building with Brainigen.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <blockquote className="text-sm leading-relaxed mb-6 text-[hsl(var(--fg))]">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[hsl(var(--brand)/0.15)] flex items-center justify-center text-sm font-bold text-[hsl(var(--brand))]">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-[hsl(var(--muted))]">{t.role}, {t.company}</div>
                </div>
                <span className="ml-auto text-[10px] rounded-full border border-[hsl(var(--border))] px-2 py-0.5 text-[hsl(var(--muted-2))]">{t.industry}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
