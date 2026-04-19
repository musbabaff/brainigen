'use client';

export function useChartColors() {
  return {
    primary: 'hsl(var(--primary))',
    muted: 'hsl(var(--muted))',
    background: 'hsl(var(--card))',
    border: 'hsl(var(--border))',
    grid: 'hsl(var(--border) / 0.3)',
    text: 'hsl(var(--foreground))',
    textMuted: 'hsl(var(--muted-foreground))',
  };
}
