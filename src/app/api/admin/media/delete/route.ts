import { createClient } from '@/lib/supabase/server';
import { canAccessAdminPanel } from '@/lib/auth/permissions';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !canAccessAdminPanel(profile.role)) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const { bucket, filename } = await req.json();
  if (!bucket || !filename) return Response.json({ error: 'Missing bucket or filename' }, { status: 400 });

  const { error } = await supabase.storage.from(bucket).remove([filename]);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
