'use client';

import { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from '@/i18n/navigation';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [showHelp, setShowHelp] = useState(false);

  useHotkeys('mod+/', (e) => { e.preventDefault(); setShowHelp(true); });
  useHotkeys('shift+?', (e) => { e.preventDefault(); setShowHelp(true); });
  useHotkeys('g d', () => router.push('/dashboard'));
  useHotkeys('g b', () => router.push('/blog'));
  useHotkeys('g s', () => router.push('/dashboard/settings'));
  useHotkeys('g a', () => router.push('/dashboard/agents'));
  useHotkeys('mod+shift+d', (e) => {
    e.preventDefault();
    setTheme(theme === 'dark' ? 'light' : 'dark');
  });

  return (
    <>
      {children}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 pt-4">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Navigation</h4>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Go to Dashboard</span><kbd className="px-2 py-1 bg-muted rounded border text-xs font-mono">G then D</kbd></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Go to Blog</span><kbd className="px-2 py-1 bg-muted rounded border text-xs font-mono">G then B</kbd></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Go to Settings</span><kbd className="px-2 py-1 bg-muted rounded border text-xs font-mono">G then S</kbd></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Go to Agents</span><kbd className="px-2 py-1 bg-muted rounded border text-xs font-mono">G then A</kbd></div>
            </div>
            <div className="space-y-3 mt-2">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Actions</h4>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Command Palette</span><kbd className="px-2 py-1 bg-muted rounded border text-xs font-mono">Cmd/Ctrl + K</kbd></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Global Search</span><kbd className="px-2 py-1 bg-muted rounded border text-xs font-mono">/</kbd></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Toggle Dark Mode</span><kbd className="px-2 py-1 bg-muted rounded border text-xs font-mono">Cmd + Shift + D</kbd></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Show Shortcuts Help</span><kbd className="px-2 py-1 bg-muted rounded border text-xs font-mono">Cmd + /</kbd></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
