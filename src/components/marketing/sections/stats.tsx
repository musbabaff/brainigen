'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000 }: {
  end: number; suffix?: string; prefix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  const display = end >= 1000000
    ? `${(count / 1000000).toFixed(1)}M`
    : end >= 1000
    ? `${(count / 1000).toFixed(count >= 1000 ? 0 : 1)}k`
    : count % 1 !== 0 ? count.toFixed(2) : count.toString();

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

const stats = [
  { value: 12400, suffix: '+', label: 'Agents Deployed', desc: 'Running in production worldwide' },
  { value: 1200000, suffix: '', label: 'Messages / Month', desc: 'Processed with 99.2% accuracy' },
  { value: 99.99, suffix: '%', label: 'Uptime', desc: 'Over the last 90 days' },
  { value: 47, suffix: '', label: 'Countries', desc: 'Served globally' },
];

export function Stats() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[hsl(var(--brand)/0.03)] pointer-events-none" />

      <div className="container-narrow relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 mb-3">Numbers that speak for themselves</h2>
          <p className="text-lead max-w-xl mx-auto">Real metrics from teams building with Brainigen every day.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[hsl(var(--border))] rounded-2xl border border-[hsl(var(--border))] overflow-hidden bg-[hsl(var(--surface))]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease }}
              className="flex flex-col items-center text-center p-8 lg:p-10 hover:bg-[hsl(var(--surface-2))] transition-colors duration-200"
            >
              <div className="text-3xl lg:text-5xl font-bold tracking-tight text-[hsl(var(--fg))] mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-semibold text-[hsl(var(--fg))] mb-1">{stat.label}</div>
              <div className="text-xs text-[hsl(var(--muted))]">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
