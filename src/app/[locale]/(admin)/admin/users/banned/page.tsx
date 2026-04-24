import { createClient } from '@/lib/supabase/server';
import { UsersTable } from '@/components/admin/users/users-table';
import { Ban } from 'lucide-react';

export default async function BannedUsersPage() {
  const supabase = await createClient();

  const { data: users } = await supabase
    .from('profiles')
    .select('id, full_name, email, avatar_url, role, plan, created_at, last_sign_in_at, mfa_enabled, banned')
    .eq('banned', true)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h2 mb-1 flex items-center gap-2">
          <Ban className="w-6 h-6 text-red-500" />
          Banned Users
        </h1>
        <p className="text-muted text-sm">{users?.length || 0} banned users</p>
      </div>

      <UsersTable users={users || []} />
    </div>
  );
}
