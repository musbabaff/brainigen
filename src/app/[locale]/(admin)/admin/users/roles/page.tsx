import { createClient } from '@/lib/supabase/server';
import { ROLE_PERMISSIONS, type UserRole } from '@/lib/auth/permissions';
import { Check, X } from 'lucide-react';
import { RoleBadge } from '@/components/admin/users/role-badge';

const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  super_admin: 'Full system access including backups and maintenance mode',
  admin: 'Manages users, content, billing, and system settings',
  moderator: 'Reviews content, moderates comments, handles reports',
  editor: 'Creates and publishes content, manages marketing',
  support: 'Handles tickets and customer support',
  customer: 'Standard user of the platform',
};

const ALL_PERMISSIONS = [
  'users.view', 'users.create', 'users.update', 'users.delete',
  'content.view', 'content.create', 'content.publish', 'content.delete',
  'moderation.approve', 'moderation.ban_users',
  'support.reply', 'support.close',
  'billing.view', 'billing.manage',
  'settings.update', 'system.logs',
  'analytics.view', 'api.manage_keys',
];

export default async function RolesPage() {
  const supabase = await createClient();
  const { data: counts } = await supabase.from('profiles').select('role');

  const roleCounts: Record<string, number> = {};
  counts?.forEach(p => { roleCounts[p.role] = (roleCounts[p.role] || 0) + 1; });

  const roles = Object.keys(ROLE_PERMISSIONS) as UserRole[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h2 mb-1">Roles & Permissions</h1>
        <p className="text-muted text-sm">Manage role-based access control</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <div key={role} className="p-5 rounded-xl border border-border bg-surface">
            <div className="flex items-center justify-between mb-3">
              <RoleBadge role={role} />
              <span className="text-xs text-muted">{roleCounts[role] || 0} users</span>
            </div>
            <p className="text-sm text-muted">{ROLE_DESCRIPTIONS[role]}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold">Permission Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-2 border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                  Permission
                </th>
                {roles.map(role => (
                  <th key={role} className="px-4 py-3 text-center text-xs font-medium text-muted uppercase tracking-wider whitespace-nowrap">
                    {role.replace('_', ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ALL_PERMISSIONS.map(perm => (
                <tr key={perm} className="hover:bg-surface-2">
                  <td className="px-4 py-3 text-sm font-mono text-muted">{perm}</td>
                  {roles.map(role => {
                    const rolePerms = ROLE_PERMISSIONS[role];
                    const has = rolePerms[0] === '*' || (rolePerms as string[]).includes(perm);
                    return (
                      <td key={role} className="px-4 py-3 text-center">
                        {has ? (
                          <Check className="w-4 h-4 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-muted mx-auto opacity-30" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
