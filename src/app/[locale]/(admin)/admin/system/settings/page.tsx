import { createClient } from '@/lib/supabase/server';
import { Settings } from 'lucide-react';
import { SiteSettingsClient } from '@/components/admin/system/site-settings-client';

export default async function SiteSettingsPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase.from('site_settings').select('key, value, encrypted');

  const settings: Record<string, { value: string | null; encrypted: boolean }> = {};
  for (const row of rows ?? []) {
    let displayValue: string | null = null;
    if (!row.encrypted && row.value !== null) {
      try {
        const parsed = JSON.parse(row.value);
        displayValue = typeof parsed === 'string' ? parsed : JSON.stringify(parsed);
      } catch {
        displayValue = row.value;
      }
    }
    settings[row.key] = { value: displayValue, encrypted: row.encrypted };
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center">
          <Settings className="w-5 h-5 text-brand" />
        </div>
        <div>
          <h1 className="text-h2">Site Settings</h1>
          <p className="text-muted text-sm">Manage all platform configuration from one place</p>
        </div>
      </div>

      <SiteSettingsClient initialSettings={settings} />
    </div>
  );
}
