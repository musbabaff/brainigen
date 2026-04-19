'use client';

import { motion } from 'framer-motion';

const logos = [
  'Quantum AI', 'NeuroTech', 'DataCraft', 'CloudSync', 'Acme Corp',
  'ScaleUp', 'NovaBridge', 'TechFlow', 'DataVault', 'Nextera',
];

export function LogoCloud() {
  return (
    <section className="py-16 border-y border-[hsl(var(--border))]">
      <div className="container-narrow">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs uppercase tracking-[0.15em] font-medium text-[hsl(var(--muted-2))] mb-8"
        >
          Trusted by innovative teams worldwide
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {logos.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ opacity: 0.8 }}
              className="text-base font-semibold text-[hsl(var(--muted))] tracking-tight select-none cursor-default transition-opacity"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
