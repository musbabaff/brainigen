import { createClient } from '@/lib/supabase/server';
import { canAccessAdminPanel } from '@/lib/auth/permissions';
import { z } from 'zod';
import { logAdminAction } from '@/lib/audit';
import { randomBytes } from 'crypto';
import { NextRequest } from 'next/server';

const schema = z.object({
  email: z.string().email(),
  role: z.enum(['super_admin', 'admin', 'moderator', 'editor', 'support', 'customer']),
});

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !canAccessAdminPanel(profile.role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return Response.json({ error: 'Invalid input' }, { status: 400 });

  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data: invitation, error } = await supabase
    .from('user_invitations')
    .insert({
      email: parsed.data.email,
      role: parsed.data.role,
      token,
      expires_at: expiresAt,
      invited_by: user.id,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  await logAdminAction({
    action: 'user.invite',
    entityType: 'invitation',
    entityId: invitation.id,
    metadata: { email: parsed.data.email, role: parsed.data.role },
    request: req,
  });

  return Response.json({ invitation });
}
