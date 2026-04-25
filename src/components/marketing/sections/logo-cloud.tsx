'use client';

import { motion } from 'framer-motion';

const LOGOS = [
  'Quantum AI', 'NeuroTech', 'DataCraft', 'CloudSync', 'Acme Corp',
  'ScaleUp', 'NovaBridge', 'TechFlow', 'DataVault', 'Nextera',
  'IntelliCore', 'SynthLab', 'PeakOps', 'Axiom AI', 'GridMind',
];

function LogoItem({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center justify-center px-6 py-2 text-sm font-semibold text-[hsl(var(--muted-2))] hover:text-[hsl(var(--muted))] tracking-tight whitespace-nowrap select-none cursor-default transition-colors duration-200">
      {name}
    </span>
  );
}

export function LogoCloud() {
  return (
    <section className="py-14 border-y border-[hsl(var(--border))] overflow-hidden">
      <div className="container-narrow mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[11px] uppercase tracking-[0.15em] font-semibold text-[hsl(var(--muted-2))]"
        >
          Trusted by innovative teams worldwide
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[hsl(var(--bg))] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[hsl(var(--bg))] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          <div className="flex shrink-0">
            {LOGOS.map((name) => <LogoItem key={name} name={name} />)}
          </div>
          <div className="flex shrink-0" aria-hidden>
            {LOGOS.map((name) => <LogoItem key={`${name}-2`} name={name} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
