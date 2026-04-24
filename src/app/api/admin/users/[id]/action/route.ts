import { createClient } from '@/lib/supabase/server';
import { canAccessAdminPanel, isAdmin } from '@/lib/auth/permissions';
import { z } from 'zod';
import { logAdminAction } from '@/lib/audit';
import { NextRequest } from 'next/server';

const schema = z.object({
  action: z.enum(['ban', 'unban', 'delete', 'change_role', 'change_plan']),
  value: z.string().optional(),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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

  const { action, value } = parsed.data;

  try {
    switch (action) {
      case 'ban':
        await supabase.from('profiles').update({ banned: true }).eq('id', id);
        break;
      case 'unban':
        await supabase.from('profiles').update({ banned: false }).eq('id', id);
        break;
      case 'change_role':
        if (!isAdmin(profile.role)) return Response.json({ error: 'Admin only' }, { status: 403 });
        if (value) await supabase.from('profiles').update({ role: value }).eq('id', id);
        break;
      case 'change_plan':
        if (value) await supabase.from('profiles').update({ plan: value }).eq('id', id);
        break;
      case 'delete':
        if (!isAdmin(profile.role)) return Response.json({ error: 'Admin only' }, { status: 403 });
        await supabase.auth.admin.deleteUser(id);
        break;
    }

    await logAdminAction({
      action: `user.${action}`,
      entityType: 'user',
      entityId: id,
      metadata: { value },
      request: req,
    });

    return Response.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
