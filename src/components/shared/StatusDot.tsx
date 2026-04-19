'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatusDotProps {
  status: 'online' | 'offline' | 'idle' | 'error' | 'active' | 'paused';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  pulse?: boolean;
}

const statusConfig = {
  online: { color: 'bg-emerald-500', label: 'Online' },
  active: { color: 'bg-emerald-500', label: 'Active' },
  idle: { color: 'bg-yellow-500', label: 'Idle' },
  error: { color: 'bg-red-500', label: 'Error' },
  offline: { color: 'bg-gray-400', label: 'Offline' },
  paused: { color: 'bg-blue-500', label: 'Paused' },
};

const sizeConfig = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
};

export function StatusDot({ status, size = 'md', showLabel = false, pulse = false }: StatusDotProps) {
  const config = statusConfig[status];
  const sizeClass = sizeConfig[size];

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center">
        <div className={cn('rounded-full', sizeClass, config.color)} />
        {(pulse || status === 'online' || status === 'active') && (
          <motion.div
            className={cn('absolute inset-0 rounded-full opacity-50', config.color)}
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </div>
      {showLabel && <span className="text-sm font-medium text-muted-foreground">{config.label}</span>}
    </div>
  );
}
