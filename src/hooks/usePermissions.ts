'use client';
import { useEffect, useState } from 'react';
import { useUser } from './use-user';
import { createClient } from '@/lib/supabase/client';
import { hasPermission, canAccessAdminPanel, isAdmin, isStaff, type Permission, type UserRole } from '@/lib/auth/permissions';

export function usePermissions() {
  const { user } = useUser();
  const [role, setRole] = useState<UserRole>('customer');
  const supabase = createClient();

  useEffect(() => {
    if (user) {
      supabase.from('profiles').select('role').eq('id', user.id).single().then(({ data }) => {
        if (data?.role) setRole(data.role as UserRole);
      });
    } else {
      setTimeout(() => setRole('customer'), 0);
    }
  }, [user, supabase]);
  
  return {
    role,
    can: (permission: Permission) => hasPermission(role, permission),
    canAccessAdmin: canAccessAdminPanel(role),
    isSuperAdmin: role === 'super_admin',
    isAdmin: isAdmin(role),
    isModerator: role === 'moderator',
    isEditor: role === 'editor',
    isSupport: role === 'support',
    isCustomer: role === 'customer',
    isStaff: isStaff(role),
  };
}
