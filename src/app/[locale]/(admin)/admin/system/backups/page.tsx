'use client';

import { useState } from 'react';
import { HardDrive, Database, Download, CheckCircle } from 'lucide-react';

const TABLES = ['profiles', 'agents', 'conversations', 'invoices', 'tickets', 'activity_log', 'api_keys', 'webhooks', 'email_campaigns', 'kb_articles'];

export default function BackupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center"><HardDrive className="w-5 h-5 text-muted" /></div>
        <div><h1 className="text-h2">Backups</h1><p className="text-muted text-sm">Super Admin only — database backup management</p></div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2"><Database className="w-4 h-4" />Manual Export</h3>
        <p className="text-sm text-muted">Export your Supabase database directly via the Supabase Dashboard. Navigate to <strong className="text-foreground">Database → Backups</strong> to download a full database dump.</p>
        <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 h-9 px-4 border border-border rounded-md text-sm hover:bg-surface-2 transition-colors">
          <Download className="w-4 h-4" />Open Supabase Dashboard
        </a>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 space-y-4">
        <h3 className="font-semibold">Automated Backups via Supabase</h3>
        <div className="space-y-3">
          {[
            'Point-in-time recovery (PITR) available on Pro and Enterprise plans',
            'Daily backups retained for 7 days on Pro, 30 days on Enterprise',
            'Backups stored in geographically distributed storage',
            'Enable via Supabase Dashboard → Project Settings → Database',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span className="text-muted">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
        <p className="text-sm text-amber-500">
          <strong>Note:</strong> Automated backup scheduling via this admin panel requires a Supabase Edge Function with pg_dump access. Contact support to configure custom backup schedules with S3/R2 destinations.
        </p>
      </div>
    </div>
  );
}
