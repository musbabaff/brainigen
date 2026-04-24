import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Layout, Plus } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/date-utils';

const STATIC_PAGES = ['about', 'careers', 'press', 'partners'];

export default async function StaticPagesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('static_pages').select('slug, title, updated_at').in('slug', STATIC_PAGES);
  const pageMap = Object.fromEntries((data ?? []).map(p => [p.slug, p]));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Layout className="w-5 h-5 text-brand" /></div>
        <div><h1 className="text-h2">Static Pages</h1><p className="text-muted text-sm">Edit marketing pages without touching code</p></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STATIC_PAGES.map(slug => {
          const page = pageMap[slug];
          return (
            <Link key={slug} href={`/admin/content/pages/${slug}`} className="p-5 rounded-xl border border-border bg-surface hover:border-brand/40 transition-colors block">
              <div className="font-semibold capitalize mb-1">{slug}</div>
              <div className="text-xs text-muted">{page?.updated_at ? `Updated ${formatDistanceToNow(page.updated_at)}` : 'Not yet edited'}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
