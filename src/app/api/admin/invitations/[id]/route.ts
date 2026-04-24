import { createClient } from '@/lib/supabase/server';
import { canAccessAdminPanel } from '@/lib/auth/permissions';
import { logAdminAction } from '@/lib/audit';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !canAccessAdminPanel(profile.role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  await supabase.from('user_invitations').delete().eq('id', id);
  await logAdminAction({ action: 'invitation.cancel', entityType: 'invitation', entityId: id, request: req });

  return Response.json({ success: true });
}
