import { createClient } from '@/lib/supabase/server';
import { canAccessAdminPanel } from '@/lib/auth/permissions';
import { setSetting } from '@/lib/settings';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !canAccessAdminPanel(profile.role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { key, value, encrypted, category } = await req.json();
  if (!key) return Response.json({ error: 'Missing key' }, { status: 400 });

  await setSetting(key, value, {
    encrypted: encrypted ?? false,
    category: category ?? 'general',
    updatedBy: user.id,
  });

  return Response.json({ success: true });
}

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !canAccessAdminPanel(profile.role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const url = new URL(req.url);
  const category = url.searchParams.get('category');

  let query = supabase.from('site_settings').select('key, value, encrypted, category, description, updated_at');
  if (category) query = query.eq('category', category);

  const { data } = await query;
  return Response.json({ settings: data ?? [] });
}
