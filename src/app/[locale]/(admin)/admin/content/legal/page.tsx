import { createClient } from '@/lib/supabase/server';
import { formatDistanceToNow } from '@/lib/date-utils';
import Link from 'next/link';
import { Shield, Clock } from 'lucide-react';

const LEGAL_PAGES = [
  { slug: 'terms', label: 'Terms of Service' },
  { slug: 'privacy', label: 'Privacy Policy' },
  { slug: 'cookies', label: 'Cookie Policy' },
  { slug: 'dpa', label: 'Data Processing Agreement' },
  { slug: 'acceptable-use', label: 'Acceptable Use Policy' },
  { slug: 'refund', label: 'Refund Policy' },
];

export default async function LegalCMSPage() {
  const supabase = await createClient();
  const { data: pages } = await supabase.from('legal_pages').select('id, slug, title, version, updated_at');

  const pageMap = Object.fromEntries((pages ?? []).map(p => [p.slug, p]));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Shield className="w-5 h-5 text-amber-500" /></div>
        <div>
          <h1 className="text-h2">Legal Pages</h1>
          <p className="text-muted text-sm">Every save creates a versioned audit trail</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEGAL_PAGES.map(({ slug, label }) => {
          const page = pageMap[slug];
          return (
            <Link key={slug} href={`/admin/content/legal/${slug}`} className="p-5 rounded-xl border border-border bg-surface hover:border-brand/40 transition-colors block">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">{label}</div>
                {page && <span className="text-xs text-muted bg-surface-2 px-2 py-0.5 rounded">v{page.version ?? 1}</span>}
              </div>
              {page?.updated_at ? (
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <Clock className="w-3 h-3" />
                  Last updated {formatDistanceToNow(page.updated_at)}
                </div>
              ) : (
                <div className="text-xs text-muted opacity-50">Not yet created</div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
