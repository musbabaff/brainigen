'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

function Counter({ end, suffix = '', duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const step = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  const display =
    end >= 1_000_000 ? `${(count / 1_000_000).toFixed(1)}M`
    : end >= 1_000 ? `${(count / 1_000).toFixed(count >= 1_000 ? 0 : 1)}k`
    : end % 1 !== 0 ? count.toFixed(2)
    : count.toString();

  return <span ref={ref}>{display}{suffix}</span>;
}

const stats = [
  {
    value: 12400,
    suffix: '+',
    label: 'Agents deployed',
    desc: 'Running in production worldwide',
    color: 'text-[hsl(var(--brand))]',
  },
  {
    value: 1200000,
    suffix: '',
    label: 'Messages / month',
    desc: 'Processed with 99.2% accuracy',
    color: 'text-emerald-400',
  },
  {
    value: 99.99,
    suffix: '%',
    label: 'Uptime',
    desc: 'Over the last 90 days',
    color: 'text-blue-400',
  },
  {
    value: 47,
    suffix: '',
    label: 'Countries',
    desc: 'Served globally',
    color: 'text-violet-400',
  },
];

export function Stats() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[hsl(var(--surface-2)/0.5)]" />
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
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(var(--brand))] mb-4">By the numbers</p>
          <h2 className="text-h2 leading-tight">
            Metrics from teams<br />
            <span className="text-[hsl(var(--muted))]">building every day.</span>
          </h2>
        </motion.div>

        {/* Stats grid — horizontal lines style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y lg:divide-y-0 divide-[hsl(var(--border))] border border-[hsl(var(--border))] rounded-2xl overflow-hidden bg-[hsl(var(--surface))]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
              className="group flex flex-col items-center text-center p-8 lg:p-12 hover:bg-[hsl(var(--surface-2))] transition-colors duration-200"
            >
              <div className={`text-4xl lg:text-6xl font-bold tracking-tight mb-3 ${stat.color}`}>
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-semibold text-[hsl(var(--fg))] mb-1.5">{stat.label}</div>
              <div className="text-xs text-[hsl(var(--muted))] leading-relaxed max-w-[120px]">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
