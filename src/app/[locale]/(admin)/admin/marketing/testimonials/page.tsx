import { createClient } from '@/lib/supabase/server';
import { formatDistanceToNow } from '@/lib/date-utils';
import Link from 'next/link';
import { Quote, Plus } from 'lucide-react';

export default async function TestimonialsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('testimonials').select('id, quote, author_name, author_title, company, featured, active, display_order, created_at').order('display_order');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Quote className="w-5 h-5 text-brand" /></div>
          <div><h1 className="text-h2">Testimonials</h1><p className="text-muted text-sm">{data?.length ?? 0} customer quotes</p></div>
        </div>
        <Link href="/admin/marketing/testimonials/new" className="inline-flex items-center gap-2 h-9 px-4 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors">
          <Plus className="w-4 h-4" />Add Testimonial
        </Link>
      </div>
      {!data || data.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-16 text-center">
          <Quote className="w-12 h-12 text-muted mx-auto mb-4 opacity-30" />
          <h3 className="font-semibold mb-2">No testimonials yet</h3>
          <p className="text-muted text-sm mb-6">Add customer quotes for your homepage</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map(t => (
            <div key={t.id} className="p-5 rounded-xl border border-border bg-surface hover:border-brand/40 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="text-sm italic text-muted line-clamp-3">&ldquo;{t.quote}&rdquo;</div>
                {t.featured && <span className="ml-3 shrink-0 text-[10px] px-2 py-0.5 rounded bg-brand-soft text-brand uppercase tracking-wider">Featured</span>}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div>
                  <div className="text-sm font-medium">{t.author_name}</div>
                  <div className="text-xs text-muted">{t.author_title}{t.company ? ` · ${t.company}` : ''}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded uppercase ${t.active ? 'bg-green-500/10 text-green-500' : 'bg-surface-2 text-muted'}`}>{t.active ? 'Active' : 'Hidden'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
