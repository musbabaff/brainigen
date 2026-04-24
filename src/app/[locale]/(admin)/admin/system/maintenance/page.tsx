'use client';

import { useState } from 'react';
import { ToggleLeft, AlertTriangle, Clock, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MaintenancePage() {
  const [enabled, setEnabled] = useState(false);
  const [message, setMessage] = useState('We are performing scheduled maintenance. We will be back shortly.');
  const [endTime, setEndTime] = useState('');
  const [whitelist, setWhitelist] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    await fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'maintenance_mode', value: JSON.stringify({ enabled, message, end_time: endTime, ip_whitelist: whitelist.split(',').map(s => s.trim()).filter(Boolean) }), category: 'system' }) });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><ToggleLeft className="w-5 h-5 text-amber-500" /></div>
        <div><h1 className="text-h2">Maintenance Mode</h1><p className="text-muted text-sm">Super Admin only — take site offline for maintenance</p></div>
      </div>

      {enabled && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
          <div>
            <div className="text-sm font-semibold text-red-500">Maintenance mode is ACTIVE</div>
            <div className="text-xs text-red-400 mt-0.5">Non-admin users see the maintenance page</div>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-border bg-surface p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">Enable Maintenance Mode</div>
            <div className="text-sm text-muted mt-0.5">All non-admin traffic will see the maintenance page</div>
          </div>
          <button onClick={() => setEnabled(!enabled)} className={cn('relative w-12 h-6 rounded-full transition-colors', enabled ? 'bg-red-500' : 'bg-surface-2 border border-border')}>
            <span className={cn('absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform', enabled ? 'translate-x-6' : 'translate-x-0.5')} />
          </button>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">Custom Message (supports Markdown)</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4}
            className="w-full px-3 py-2 rounded-md bg-surface-2 border border-border text-sm focus:border-brand focus:outline-none resize-none" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2"><Clock className="w-4 h-4" />Expected End Time</label>
            <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)}
              className="w-full h-10 px-3 rounded-md bg-surface-2 border border-border text-sm focus:border-brand focus:outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2"><Shield className="w-4 h-4" />IP Whitelist (comma-separated)</label>
            <input type="text" value={whitelist} onChange={e => setWhitelist(e.target.value)} placeholder="192.168.1.1, 10.0.0.1"
              className="w-full h-10 px-3 rounded-md bg-surface-2 border border-border text-sm focus:border-brand focus:outline-none" />
          </div>
        </div>

        <button onClick={save} disabled={saving}
          className="h-10 px-6 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 disabled:opacity-50 transition-colors">
          {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
