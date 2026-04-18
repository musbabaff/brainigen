'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTheme } from 'next-themes';
import { Command } from 'cmdk';
import { 
  Search, Home, LayoutDashboard, Settings, Plus, Users, 
  LogOut, Sun, Moon, Globe, Bot, CreditCard, Activity,
  FileText
} from 'lucide-react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center pt-[20vh] px-4">
      <div 
        className="fixed inset-0" 
        onClick={() => setOpen(false)}
      />
      <Command 
        className="relative w-full max-w-2xl bg-card border border-border/50 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        label="Global Command Menu"
      >
        <div className="flex items-center border-b border-border/50 px-3">
          <Search className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
          <Command.Input 
            autoFocus 
            placeholder="Type a command or search..." 
            className="flex-1 h-14 bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">ESC</span>
          </kbd>
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-smooth">
          <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
            No results found.
          </Command.Empty>

          <Command.Group heading="Pages" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            <Command.Item onSelect={() => runCommand(() => router.push('/'))} className="flex items-center gap-2 px-2 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm mb-1 aria-selected:bg-accent aria-selected:text-accent-foreground">
              <Home className="h-4 w-4" /> Home
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/dashboard'))} className="flex items-center gap-2 px-2 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm mb-1 aria-selected:bg-accent aria-selected:text-accent-foreground">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/dashboard/agents'))} className="flex items-center gap-2 px-2 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm mb-1 aria-selected:bg-accent aria-selected:text-accent-foreground">
              <Bot className="h-4 w-4" /> Agents
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/dashboard/analytics'))} className="flex items-center gap-2 px-2 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm mb-1 aria-selected:bg-accent aria-selected:text-accent-foreground">
              <Activity className="h-4 w-4" /> Analytics
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/dashboard/billing'))} className="flex items-center gap-2 px-2 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm mb-1 aria-selected:bg-accent aria-selected:text-accent-foreground">
              <CreditCard className="h-4 w-4" /> Billing
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/dashboard/settings'))} className="flex items-center gap-2 px-2 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm mb-1 aria-selected:bg-accent aria-selected:text-accent-foreground">
              <Settings className="h-4 w-4" /> Settings
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/blog'))} className="flex items-center gap-2 px-2 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm aria-selected:bg-accent aria-selected:text-accent-foreground">
              <FileText className="h-4 w-4" /> Blog
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Actions" className="px-2 py-1.5 text-xs font-medium text-muted-foreground mt-2">
            <Command.Item onSelect={() => runCommand(() => router.push('/dashboard/agents/new'))} className="flex items-center gap-2 px-2 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm mb-1 aria-selected:bg-accent aria-selected:text-accent-foreground">
              <Plus className="h-4 w-4" /> Create new agent
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/dashboard/settings/team'))} className="flex items-center gap-2 px-2 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm mb-1 aria-selected:bg-accent aria-selected:text-accent-foreground">
              <Users className="h-4 w-4" /> Invite team member
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => console.log('logout'))} className="flex items-center gap-2 px-2 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm aria-selected:bg-accent aria-selected:text-accent-foreground">
              <LogOut className="h-4 w-4" /> Sign out
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Preferences" className="px-2 py-1.5 text-xs font-medium text-muted-foreground mt-2">
            <Command.Item onSelect={() => runCommand(() => setTheme('light'))} className="flex items-center gap-2 px-2 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm mb-1 aria-selected:bg-accent aria-selected:text-accent-foreground">
              <Sun className="h-4 w-4" /> Light Mode
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => setTheme('dark'))} className="flex items-center gap-2 px-2 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm aria-selected:bg-accent aria-selected:text-accent-foreground">
              <Moon className="h-4 w-4" /> Dark Mode
            </Command.Item>
          </Command.Group>
        </Command.List>
        <div className="border-t border-border/50 p-2 text-center text-xs text-muted-foreground flex justify-center gap-4">
          <span className="flex items-center gap-1"><kbd className="bg-muted px-1 py-0.5 rounded border">↑</kbd> <kbd className="bg-muted px-1 py-0.5 rounded border">↓</kbd> Navigate</span>
          <span className="flex items-center gap-1"><kbd className="bg-muted px-1 py-0.5 rounded border">↵</kbd> Select</span>
          <span className="flex items-center gap-1"><kbd className="bg-muted px-1 py-0.5 rounded border">ESC</kbd> Close</span>
        </div>
      </Command>
    </div>
  );
}
