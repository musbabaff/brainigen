'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  { q: 'How long does it take to set up?', a: 'Most teams deploy their first agent in under 5 minutes using our templates. Custom agents with knowledge bases typically take 30 minutes to an hour.' },
  { q: 'How much does it cost?', a: 'We offer a generous free tier. Paid plans start at $49/month for Pro and $199/month for Business. Enterprise pricing is custom.' },
  { q: 'Can I bring my own LLM?', a: 'Yes! Brainigen supports OpenAI, Anthropic, Google Gemini, Mistral, Llama, and any OpenAI-compatible API. You can switch models per agent.' },
  { q: 'Does it work offline?', a: 'Brainigen is a cloud-based platform, but we offer on-premise deployment for Enterprise customers with specific compliance requirements.' },
  { q: 'How do you handle data privacy?', a: 'We are GDPR and CCPA compliant. Data is encrypted at rest and in transit. We never use your data to train models. SOC 2 certification is in progress.' },
  { q: 'Can I cancel anytime?', a: 'Yes, all plans are month-to-month with no long-term commitments. You can cancel anytime from your dashboard.' },
  { q: 'Do you offer training?', a: 'Yes. All paid plans include onboarding sessions. Business and Enterprise plans include dedicated training and ongoing optimization support.' },
  { q: 'Is there a free trial?', a: 'Our Free tier is available forever with no credit card required. Paid plans come with a 14-day free trial.' },
  { q: 'What languages are supported?', a: 'Brainigen agents can converse in 50+ languages out of the box, with automatic language detection and response.' },
  { q: 'Can I white-label the agents?', a: 'Yes! Pro plans and above include custom branding. Enterprise plans offer full white-label capabilities including custom domains.' },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-[hsl(var(--surface-2))]">
      <div className="container-narrow">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-h2 mb-4">Frequently asked questions</h2>
          <p className="text-lead max-w-2xl mx-auto">Everything you need to know about Brainigen.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-2">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                >
                  <span className="font-medium text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-[hsl(var(--muted))] shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-sm text-[hsl(var(--muted))] leading-relaxed">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact card */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 sticky top-24">
              <MessageCircle className="h-8 w-8 text-[hsl(var(--brand))] mb-4" />
              <h3 className="font-semibold text-lg mb-2">Still have questions?</h3>
              <p className="text-sm text-[hsl(var(--muted))] mb-4">Our team is here to help. Get in touch and we&apos;ll respond within 24 hours.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-[hsl(var(--brand))] text-white text-sm font-medium hover:opacity-90 transition-all">
                Contact sales <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
