"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { label: "Agents deployed", value: 12439, suffix: "+" },
  { label: "Messages processed", value: 1200000, suffix: "+", format: "compact" },
  { label: "Uptime", value: 99.99, suffix: "%", decimals: 2 },
  { label: "Countries", value: 47, suffix: "" },
];

function formatNumber(value: number, format?: string, decimals?: number): string {
  if (format === "compact") {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  }
  if (decimals) return value.toFixed(decimals);
  return value.toLocaleString();
}

function AnimatedNumber({ value, format, decimals, suffix }: {
  value: number;
  format?: string;
  decimals?: number;
  suffix: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(display, format, decimals)}{suffix}
    </span>
  );
}

export function LiveStats() {
  return (
    <section className="py-16 border-t border-border/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold tracking-[-0.03em] mb-1">
                <AnimatedNumber
                  value={stat.value}
                  format={(stat as Record<string, unknown>).format as string | undefined}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
