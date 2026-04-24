'use client';

import { useState } from 'react';
import { Download, FileJson, FileText, Database } from 'lucide-react';

const TABLES = [
  { id: 'profiles', label: 'Users (profiles)' },
  { id: 'agents', label: 'AI Agents' },
  { id: 'conversations', label: 'Conversations' },
  { id: 'invoices', label: 'Invoices' },
  { id: 'tickets', label: 'Support Tickets' },
  { id: 'activity_log', label: 'Activity Log' },
  { id: 'api_keys', label: 'API Keys' },
  { id: 'kb_articles', label: 'KB Articles' },
  { id: 'email_campaigns', label: 'Email Campaigns' },
  { id: 'coupons', label: 'Coupons' },
];

export default function ExportPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [exporting, setExporting] = useState(false);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const handleExport = async () => {
    if (!selected.length) return;
    setExporting(true);
    const res = await fetch('/api/admin/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tables: selected, format }),
    });
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `brainigen-export-${new Date().toISOString().split('T')[0]}.${format === 'csv' ? 'zip' : 'json'}`;
      a.click();
      URL.revokeObjectURL(url);
    }
    setExporting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Download className="w-5 h-5 text-brand" /></div>
        <div><h1 className="text-h2">Export Data</h1><p className="text-muted text-sm">Download platform data in CSV or JSON format</p></div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 space-y-6">
        <div>
          <div className="text-sm font-medium mb-3">Select Tables</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TABLES.map(t => (
              <label key={t.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-surface-2 cursor-pointer transition-colors">
                <input type="checkbox" checked={selected.includes(t.id)} onChange={() => toggle(t.id)} className="w-4 h-4 rounded border-border" />
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-muted" />
                  <span className="text-sm">{t.label}</span>
                </div>
              </label>
            ))}
          </div>
          <button onClick={() => setSelected(TABLES.map(t => t.id))} className="mt-2 text-xs text-brand hover:underline">Select all</button>
        </div>

        <div>
          <div className="text-sm font-medium mb-3">Export Format</div>
          <div className="flex gap-3">
            {([['csv', 'CSV', FileText], ['json', 'JSON', FileJson]] as const).map(([val, label, Icon]) => (
              <button key={val} onClick={() => setFormat(val)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${format === val ? 'border-brand bg-brand-soft text-brand' : 'border-border hover:bg-surface-2'}`}>
                <Icon className="w-4 h-4" /><span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleExport} disabled={!selected.length || exporting}
          className="inline-flex items-center gap-2 h-10 px-6 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 disabled:opacity-50 transition-colors">
          <Download className="w-4 h-4" />{exporting ? 'Preparing export...' : `Export ${selected.length} table${selected.length !== 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  );
}
