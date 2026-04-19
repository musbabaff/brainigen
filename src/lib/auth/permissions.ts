export type UserRole = 'super_admin' | 'admin' | 'moderator' | 'editor' | 'support' | 'customer';

export type Permission = 
  | 'users.view' | 'users.create' | 'users.update' | 'users.delete' | 'users.impersonate'
  | 'roles.assign' | 'roles.manage_admins'
  | 'content.view' | 'content.create' | 'content.update' | 'content.delete' | 'content.publish'
  | 'moderation.view' | 'moderation.approve' | 'moderation.delete' | 'moderation.ban_users'
  | 'support.view' | 'support.reply' | 'support.assign' | 'support.close'
  | 'billing.view' | 'billing.manage' | 'billing.refund'
  | 'settings.view' | 'settings.update' | 'settings.manage_integrations'
  | 'system.logs' | 'system.backup' | 'system.maintenance' | 'system.env_vars'
  | 'analytics.view' | 'analytics.export'
  | 'api.manage_keys' | 'api.view_usage';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[] | ['*']> = {
  super_admin: ['*'],
  admin: [
    'users.view', 'users.create', 'users.update', 'users.delete',
    'roles.assign',
    'content.view', 'content.create', 'content.update', 'content.delete', 'content.publish',
    'moderation.view', 'moderation.approve', 'moderation.delete', 'moderation.ban_users',
    'support.view', 'support.reply', 'support.assign', 'support.close',
    'billing.view', 'billing.manage', 'billing.refund',
    'settings.view', 'settings.update', 'settings.manage_integrations',
    'system.logs',
    'analytics.view', 'analytics.export',
    'api.manage_keys', 'api.view_usage',
  ],
  moderator: [
    'users.view',
    'content.view', 'content.update',
    'moderation.view', 'moderation.approve', 'moderation.delete', 'moderation.ban_users',
    'support.view', 'support.reply',
    'analytics.view',
  ],
  editor: [
    'content.view', 'content.create', 'content.update', 'content.delete', 'content.publish',
    'analytics.view',
  ],
  support: [
    'users.view',
    'support.view', 'support.reply', 'support.assign', 'support.close',
    'analytics.view',
  ],
  customer: [],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  if (permissions[0] === '*') return true;
  return (permissions as Permission[]).includes(permission);
}

export function canAccessAdminPanel(role: UserRole): boolean {
  return ['super_admin', 'admin', 'moderator', 'editor', 'support'].includes(role);
}

export function isAdmin(role: UserRole): boolean {
  return role === 'super_admin' || role === 'admin';
}

export function isStaff(role: UserRole): boolean {
  return role !== 'customer';
}
