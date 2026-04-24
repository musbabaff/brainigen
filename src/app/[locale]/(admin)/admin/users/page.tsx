import { createClient } from '@/lib/supabase/server';
import { UsersTable } from '@/components/admin/users/users-table';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data: users } = await supabase
    .from('profiles')
    .select('id, full_name, email, avatar_url, role, plan, created_at, last_sign_in_at, mfa_enabled, banned')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2 mb-1">All Users</h1>
          <p className="text-muted text-sm">{users?.length || 0} total users</p>
        </div>
        <Link
          href="/admin/users/invites"
          className="inline-flex items-center gap-2 h-9 px-4 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Invite User
        </Link>
      </div>

      <UsersTable users={users || []} />
    </div>
  );
}
