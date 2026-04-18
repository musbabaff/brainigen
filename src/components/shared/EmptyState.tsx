import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; onClick?: () => void; href?: string };
  illustration?: 'default' | 'search' | 'error';
}

export function EmptyState({ icon: Icon, title, description, action, illustration = 'default' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-20 w-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
        <Icon className="h-10 w-10 text-muted-foreground/60" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      
      {action && action.onClick && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
      {action && action.href && (
        <Link href={action.href}>
          <Button>{action.label}</Button>
        </Link>
      )}
    </div>
  );
}
