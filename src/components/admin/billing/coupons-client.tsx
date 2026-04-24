'use client';

import { useState } from 'react';
import { DataTable, type Column } from '@/components/admin/data-table';
import { formatDistanceToNow } from '@/lib/date-utils';
import { Tag, Plus, RefreshCw } from 'lucide-react';

type Coupon = { id: string; code: string; discount_type: string; discount_value: number; max_uses: number | null; used_count: number; expires_at: string | null; active: boolean; created_at: string };

function generateCode() {
  return `BRAIN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export function CouponsClient({ coupons: initial }: { coupons: Coupon[] }) {
  const [coupons, setCoupons] = useState(initial);
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percent' | 'fixed'>('percent');
  const [value, setValue] = useState('');
  const [maxUses, setMaxUses] = useState('');
  const [creating, setCreating] = useState(false);

  const create = async () => {
    if (!code || !value || creating) return;
    setCreating(true);
    const res = await fetch('/api/admin/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, discount_type: type, discount_value: parseFloat(value), max_uses: maxUses ? parseInt(maxUses) : null }),
    });
    if (res.ok) { const data = await res.json(); setCoupons([data.coupon, ...coupons]); setCode(''); setValue(''); setMaxUses(''); }
    setCreating(false);
  };

  const columns: Column<Coupon>[] = [
    { key: 'code', label: 'Code', render: (c) => <span className="font-mono text-sm font-medium">{c.code}</span> },
    { key: 'discount_type', label: 'Discount', render: (c) => <span className="text-sm">{c.discount_type === 'percent' ? `${c.discount_value}%` : `$${c.discount_value}`}</span> },
    { key: 'used_count', label: 'Used', sortable: true, render: (c) => <span className="text-sm">{c.used_count}{c.max_uses ? ` / ${c.max_uses}` : ''}</span> },
    { key: 'expires_at', label: 'Expires', render: (c) => <span className="text-xs text-muted">{c.expires_at ? new Date(c.expires_at).toLocaleDateString() : 'Never'}</span> },
    { key: 'active', label: 'Status', render: (c) => <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${c.active ? 'bg-green-500/10 text-green-500' : 'bg-surface-2 text-muted'}`}>{c.active ? 'Active' : 'Disabled'}</span> },
    { key: 'created_at', label: 'Created', sortable: true, render: (c) => <span className="text-xs text-muted">{formatDistanceToNow(c.created_at)}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Tag className="w-4 h-4" /> New Coupon</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2 flex-1 min-w-[200px]">
            <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="COUPON_CODE" className="flex-1 h-10 px-3 rounded-md bg-surface-2 border border-border text-sm focus:border-brand focus:outline-none font-mono" />
            <button onClick={() => setCode(generateCode())} className="h-10 px-3 rounded-md border border-border hover:bg-surface-2 text-sm" title="Generate"><RefreshCw className="w-4 h-4" /></button>
          </div>
          <select value={type} onChange={e => setType(e.target.value as 'percent' | 'fixed')} className="h-10 px-3 rounded-md bg-surface-2 border border-border text-sm">
            <option value="percent">Percent (%)</option>
            <option value="fixed">Fixed ($)</option>
          </select>
          <input value={value} onChange={e => setValue(e.target.value)} placeholder={type === 'percent' ? '20' : '10.00'} className="w-24 h-10 px-3 rounded-md bg-surface-2 border border-border text-sm" />
          <input value={maxUses} onChange={e => setMaxUses(e.target.value)} placeholder="Max uses" className="w-28 h-10 px-3 rounded-md bg-surface-2 border border-border text-sm" />
          <button onClick={create} disabled={!code || !value || creating} className="h-10 px-4 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 disabled:opacity-50 transition-colors flex items-center gap-1.5">
            <Plus className="w-4 h-4" />Create
          </button>
        </div>
      </div>
      <DataTable data={coupons} columns={columns} searchKeys={['code']} exportFilename="coupons" emptyTitle="No coupons" emptyDescription="Create your first discount coupon" />
    </div>
  );
}
