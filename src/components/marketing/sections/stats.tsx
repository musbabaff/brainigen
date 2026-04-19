'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, MessageSquare, Clock, Globe } from 'lucide-react';

function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
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

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { icon: Users, value: 12439, suffix: '+', label: 'Agents deployed' },
  { icon: MessageSquare, value: 1200000, suffix: '+', label: 'Messages processed monthly' },
  { icon: Clock, value: 99.99, suffix: '%', label: 'Uptime last 90 days' },
  { icon: Globe, value: 47, suffix: '', label: 'Countries' },
];

export function Stats() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-narrow">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="h-12 w-12 rounded-xl bg-[hsl(var(--brand)/0.1)] flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-[hsl(var(--brand))]" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold tracking-tight mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-[hsl(var(--muted))]">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
