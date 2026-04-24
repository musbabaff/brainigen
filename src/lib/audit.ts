import { createClient } from '@/lib/supabase/server';

export async function logAdminAction({
  action,
  entityType,
  entityId,
  metadata,
  request,
}: {
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  request?: Request;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('activity_log').insert({
      user_id: user.id,
      action,
      entity_type: entityType,
      entity_id: entityId,
      metadata: metadata || {},
      ip_address: request?.headers.get('x-forwarded-for') || 'unknown',
      user_agent: request?.headers.get('user-agent') || 'unknown',
      is_admin_action: true,
    });
  } catch {
    // Silently fail — don't break the main action
  }
}
