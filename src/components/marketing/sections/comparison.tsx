'use client';

import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';

type CellValue = 'yes' | 'no' | 'partial' | string;

const rows: { feature: string; brainigen: CellValue; inhouse: CellValue; generic: CellValue }[] = [
  { feature: 'Time to deploy', brainigen: '5 minutes', inhouse: '3-6 months', generic: '1-2 weeks' },
  { feature: 'Monthly cost', brainigen: 'From $0', inhouse: '$10k-50k+', generic: '$500-2k' },
  { feature: 'Maintenance', brainigen: 'yes', inhouse: 'no', generic: 'partial' },
  { feature: 'Multi-language (50+)', brainigen: 'yes', inhouse: 'no', generic: 'partial' },
  { feature: 'Deep analytics', brainigen: 'yes', inhouse: 'partial', generic: 'no' },
  { feature: 'Enterprise security', brainigen: 'yes', inhouse: 'partial', generic: 'no' },
  { feature: 'Dedicated support', brainigen: 'yes', inhouse: 'no', generic: 'partial' },
  { feature: 'Auto-scaling', brainigen: 'yes', inhouse: 'no', generic: 'partial' },
];

function CellIcon({ value }: { value: CellValue }) {
  if (value === 'yes') return <Check className="h-4 w-4 text-emerald-500" />;
  if (value === 'no') return <X className="h-4 w-4 text-red-400" />;
  if (value === 'partial') return <Minus className="h-4 w-4 text-yellow-500" />;
  return <span className="text-sm font-medium">{value}</span>;
}

export function Comparison() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-narrow">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-h2 mb-4">Why teams choose Brainigen</h2>
          <p className="text-lead max-w-2xl mx-auto">Compare us to building in-house or using generic AI tools.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-xl border border-[hsl(var(--border))] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--surface-2))]">
                  <th className="text-left p-4 font-medium text-[hsl(var(--muted))]">Feature</th>
                  <th className="text-center p-4 font-semibold text-[hsl(var(--brand))] bg-[hsl(var(--brand-soft))]">Brainigen</th>
                  <th className="text-center p-4 font-medium text-[hsl(var(--muted))]">Building In-House</th>
                  <th className="text-center p-4 font-medium text-[hsl(var(--muted))]">Generic AI Tools</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-[hsl(var(--border))] ${i % 2 === 0 ? 'bg-[hsl(var(--surface))]' : ''}`}>
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-center bg-[hsl(var(--brand-soft)/0.3)]"><div className="flex justify-center"><CellIcon value={row.brainigen} /></div></td>
                    <td className="p-4 text-center"><div className="flex justify-center"><CellIcon value={row.inhouse} /></div></td>
                    <td className="p-4 text-center"><div className="flex justify-center"><CellIcon value={row.generic} /></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
