const PLAN_STYLES: Record<string, string> = {
  free: 'bg-surface-2 text-muted',
  pro: 'bg-brand-soft text-brand',
  business: 'bg-purple-500/10 text-purple-500',
  enterprise: 'bg-amber-500/10 text-amber-500',
};

export function PlanBadge({ plan }: { plan: string }) {
  const style = PLAN_STYLES[plan.toLowerCase()] || PLAN_STYLES.free;
  return (
    <span className={`inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded uppercase tracking-wider ${style}`}>
      {plan}
    </span>
  );
}
