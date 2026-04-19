import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Plus, Upload, Globe, FileText, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function KnowledgeBasePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: knowledgeBases } = await supabase
    .from('knowledge_bases')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const kbList = knowledgeBases || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">Knowledge Base</h1>
          <p className="text-sm text-muted-foreground mt-1">Upload documents and build RAG-powered knowledge for your agents.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer text-sm">
          <Plus className="h-4 w-4 mr-1.5" /> New Knowledge Base
        </Button>
      </div>

      {kbList.length === 0 ? (
        <Card className="border-border/30 bg-card/60">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
                <Database className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No knowledge bases yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                Upload documents (PDF, DOCX, TXT), add URLs, or paste text to create a knowledge base for your agents.
              </p>
              <div className="grid grid-cols-3 gap-3 max-w-md">
                <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border/40 bg-secondary/20 hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer">
                  <Upload className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">Upload Files</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border/40 bg-secondary/20 hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">Add URL</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border/40 bg-secondary/20 hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">Add Text</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kbList.map((kb) => (
            <Card key={kb.id} className="border-border/40 bg-card/80 hover:border-border transition-colors rounded-xl cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="outline" className={cn('text-[10px] px-2 py-0',
                    kb.status === 'ready' ? 'border-emerald-500/30 text-emerald-500' : 'border-amber-500/30 text-amber-500'
                  )}>
                    {kb.status === 'ready' ? 'Ready' : 'Processing'}
                  </Badge>
                </div>
                <h3 className="text-sm font-semibold mb-1">{kb.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {kb.document_count || 0} documents
                </p>
                <span className="text-[10px] text-muted-foreground">
                  Updated {new Date(kb.updated_at || kb.created_at).toLocaleDateString()}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
