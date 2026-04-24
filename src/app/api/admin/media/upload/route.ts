import { createClient } from '@/lib/supabase/server';
import { canAccessAdminPanel } from '@/lib/auth/permissions';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !canAccessAdminPanel(profile.role)) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const form = await req.formData();
  const file = form.get('file') as File;
  const bucket = (form.get('bucket') as string) || 'uploads';

  if (!file) return Response.json({ error: 'No file' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const { error } = await supabase.storage.from(bucket).upload(file.name, bytes, {
    contentType: file.type,
    upsert: true,
  });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true, filename: file.name });
}
