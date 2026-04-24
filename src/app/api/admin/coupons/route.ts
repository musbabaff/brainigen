import { createClient } from '@/lib/supabase/server';
import { canAccessAdminPanel } from '@/lib/auth/permissions';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !canAccessAdminPanel(profile.role)) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { code, discount_type, discount_value, max_uses, expires_at, applies_to_plans } = body;

  if (!code || !discount_type || discount_value === undefined) return Response.json({ error: 'Missing fields' }, { status: 400 });

  const { data: coupon, error } = await supabase.from('coupons').insert({
    code: code.toUpperCase(),
    discount_type,
    discount_value: parseFloat(discount_value),
    max_uses: max_uses ?? null,
    expires_at: expires_at ?? null,
    applies_to_plans: applies_to_plans ?? [],
    created_by: user.id,
  }).select().single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ coupon });
}
