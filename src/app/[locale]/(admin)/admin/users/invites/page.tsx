import { createClient } from '@/lib/supabase/server';
import { InvitesView } from '@/components/admin/users/invites-view';

export default async function InvitationsPage() {
  const supabase = await createClient();
  const { data: invites } = await supabase
    .from('user_invitations')
    .select('id, email, role, token, expires_at, accepted_at, created_at')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h2 mb-1">Invitations</h1>
        <p className="text-muted text-sm">Invite new team members and users</p>
      </div>
      <InvitesView invites={invites || []} />
    </div>
  );
}
