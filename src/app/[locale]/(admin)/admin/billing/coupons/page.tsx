import { createClient } from '@/lib/supabase/server';
import { CouponsClient } from '@/components/admin/billing/coupons-client';
import { Tag } from 'lucide-react';

export default async function CouponsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><Tag className="w-5 h-5 text-brand" /></div>
        <div><h1 className="text-h2">Coupons</h1><p className="text-muted text-sm">{data?.length ?? 0} discount codes</p></div>
      </div>
      <CouponsClient coupons={data ?? []} />
    </div>
  );
}
