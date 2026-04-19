import { createClient } from '@/lib/supabase/server';


export async function logActivity(
  action: string,
  entityType?: string,
  entityId?: string,
  metadata: Record<string, unknown> = {}
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { error } = await supabase
      .from('activity_log')
      .insert({
        user_id: user.id,
        action,
        entity_type: entityType,
        entity_id: entityId,
        metadata,
      });

    if (error) {
      console.error('[Activity Log Error]', error);
    }
  } catch (error) {
    console.error('[Activity Log Error]', error);
  }
}
