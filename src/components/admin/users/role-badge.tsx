const ROLE_STYLES: Record<string, string> = {
  super_admin: 'bg-red-500/10 text-red-500',
  admin: 'bg-brand-soft text-brand',
  moderator: 'bg-purple-500/10 text-purple-500',
  editor: 'bg-blue-500/10 text-blue-500',
  support: 'bg-cyan-500/10 text-cyan-500',
  customer: 'bg-surface-2 text-muted',
};

export function RoleBadge({ role }: { role: string }) {
  const style = ROLE_STYLES[role] || ROLE_STYLES.customer;
  return (
    <span className={`inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded uppercase tracking-wider ${style}`}>
      {role.replace('_', ' ')}
    </span>
  );
}
