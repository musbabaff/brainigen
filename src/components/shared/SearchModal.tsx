'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, FileText, File, Book, Bot, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export function SearchModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState('');
  
  // Mock results for now
  const results = [
    { type: 'blog', title: 'Getting Started with AI Agents', url: '/blog/getting-started' },
    { type: 'doc', title: 'API Authentication', url: '/docs/api-auth' },
    { type: 'agent', title: 'Support Assistant (Your Agent)', url: '/dashboard/agents/1' }
  ].filter(r => r.title.toLowerCase().includes(query.toLowerCase()) && query.length > 1);

  const getIcon = (type: string) => {
    switch(type) {
      case 'blog': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'doc': return <Book className="h-4 w-4 text-emerald-500" />;
      case 'agent': return <Bot className="h-4 w-4 text-primary" />;
      default: return <File className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-card/90 backdrop-blur-xl border-border/40">
        <div className="flex items-center px-4 border-b border-border/20">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <Input 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-14 text-base"
            placeholder="Search docs, agents, blog posts..."
          />
          <div className="flex gap-1 shrink-0">
            <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground">ESC</kbd>
          </div>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              <p>Start typing to search...</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Agents', 'API', 'Billing', 'Setup'].map(term => (
                  <button key={term} onClick={() => setQuery(term)} className="px-3 py-1 rounded-full bg-accent/50 hover:bg-accent text-xs transition-colors">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map((result, i) => (
                <Link key={i} href={result.url as any} onClick={() => onOpenChange(false)}>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent/50 cursor-pointer transition-colors group">
                    <div className="h-8 w-8 rounded-lg bg-background/50 flex items-center justify-center shrink-0">
                      {getIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{result.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{result.type}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-sm">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Search className="h-6 w-6 text-muted-foreground/50" />
              </div>
              <p className="font-medium">No results found for &quot;{query}&quot;</p>
              <p className="text-muted-foreground mt-1">Try searching for something else or contact support.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
