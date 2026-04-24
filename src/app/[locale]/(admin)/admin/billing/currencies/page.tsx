import { createClient } from '@/lib/supabase/server';
import { Globe, RefreshCw } from 'lucide-react';

const DEFAULT_RATES = [
  { code: 'USD', rate: 1.0 }, { code: 'EUR', rate: 0.92 },
  { code: 'GBP', rate: 0.79 }, { code: 'AZN', rate: 1.70 },
  { code: 'TRY', rate: 32.50 }, { code: 'RUB', rate: 90.00 },
];

export default async function CurrenciesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('currency_rates').select('*').order('code');
  const rates = data?.length ? data : DEFAULT_RATES;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Globe className="w-5 h-5 text-brand" /></div>
          <div><h1 className="text-h2">Currency Rates</h1><p className="text-muted text-sm">Configure supported currencies relative to USD</p></div>
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-4 border border-border rounded-md text-sm hover:bg-surface-2 transition-colors">
          <RefreshCw className="w-4 h-4" />Refresh Rates
        </button>
      </div>
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-2 border-b border-border">
              {['Code', 'Rate (vs USD)', 'Source', 'Last Updated', 'Override'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rates.map((r: { code: string; rate: number; source?: string; manual_override?: boolean; updated_at?: string }) => (
              <tr key={r.code} className="hover:bg-surface-2 transition-colors">
                <td className="px-4 py-3 font-mono font-semibold text-sm">{r.code}</td>
                <td className="px-4 py-3 text-sm">{Number(r.rate).toFixed(4)}</td>
                <td className="px-4 py-3 text-xs text-muted capitalize">{r.source ?? 'manual'}</td>
                <td className="px-4 py-3 text-xs text-muted">{r.updated_at ? new Date(r.updated_at).toLocaleDateString() : '—'}</td>
                <td className="px-4 py-3">
                  {r.manual_override && <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 uppercase">Manual</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
