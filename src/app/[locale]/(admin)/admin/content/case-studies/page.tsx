import { createClient } from '@/lib/supabase/server';
import { formatDistanceToNow } from '@/lib/date-utils';
import Link from 'next/link';
import { Award, Plus } from 'lucide-react';

export default async function CaseStudiesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('case_studies').select('id, customer_name, industry, status, featured, created_at').order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Award className="w-5 h-5 text-brand" /></div>
          <div><h1 className="text-h2">Case Studies</h1><p className="text-muted text-sm">{data?.length ?? 0} published stories</p></div>
        </div>
        <Link href="/admin/content/case-studies/new" className="inline-flex items-center gap-2 h-9 px-4 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors">
          <Plus className="w-4 h-4" />New Case Study
        </Link>
      </div>

      {!data || data.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-16 text-center">
          <Award className="w-12 h-12 text-muted mx-auto mb-4 opacity-30" />
          <h3 className="font-semibold mb-2">No case studies yet</h3>
          <p className="text-muted text-sm mb-6">Showcase customer success stories to build trust</p>
          <Link href="/admin/content/case-studies/new" className="inline-flex items-center gap-2 h-9 px-4 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors">
            <Plus className="w-4 h-4" />Create First Case Study
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map(cs => (
            <div key={cs.id} className="p-5 rounded-xl border border-border bg-surface hover:border-brand/40 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="font-semibold">{cs.customer_name}</div>
                {cs.featured && <span className="text-[10px] px-2 py-0.5 rounded bg-brand-soft text-brand uppercase tracking-wider">Featured</span>}
              </div>
              <div className="text-xs text-muted mb-4 capitalize">{cs.industry ?? 'General'}</div>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium ${cs.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-surface-2 text-muted'}`}>{cs.status}</span>
                <span className="text-xs text-muted">{formatDistanceToNow(cs.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
