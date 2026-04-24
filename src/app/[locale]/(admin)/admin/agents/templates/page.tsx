import { createClient } from '@/lib/supabase/server';
import { Layers, Plus } from 'lucide-react';

export default async function AgentTemplatesPage() {
  const supabase = await createClient();

  const { data: templates } = await supabase
    .from('agent_templates')
    .select('id, name, description, type, usage_count, featured, created_at')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2 mb-1 flex items-center gap-2">
            <Layers className="w-6 h-6 text-brand" />
            Agent Templates
          </h1>
          <p className="text-muted text-sm">{templates?.length || 0} templates available</p>
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-4 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors">
          <Plus className="w-4 h-4" />
          New Template
        </button>
      </div>

      {!templates || templates.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-16 text-center">
          <Layers className="w-12 h-12 text-muted mx-auto mb-4 opacity-40" />
          <h3 className="font-semibold mb-2">No templates yet</h3>
          <p className="text-muted text-sm mb-6">Create reusable agent templates for your users</p>
          <button className="inline-flex items-center gap-2 h-9 px-4 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors">
            <Plus className="w-4 h-4" />
            Create First Template
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <div key={t.id} className="p-5 rounded-xl border border-border bg-surface hover:border-brand/40 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="font-semibold">{t.name}</div>
                {t.featured && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-soft text-brand uppercase tracking-wider">Featured</span>
                )}
              </div>
              <div className="text-sm text-muted mb-4 line-clamp-2">{t.description}</div>
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="capitalize">{t.type}</span>
                <span>{t.usage_count || 0} uses</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
