import { createClient } from '@/lib/supabase/server';
import { Shield } from 'lucide-react';
import { AgentsTable, type AdminAgent } from '@/components/admin/agents/agents-table';

export default async function FlaggedAgentsPage() {
  const supabase = await createClient();

  const { data: agents } = await supabase
    .from('agents')
    .select('id, name, type, status, created_at, user_id, profiles(full_name, email)')
    .eq('flagged', true)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h2 mb-1 flex items-center gap-2">
          <Shield className="w-6 h-6 text-amber-500" />
          Flagged Agents
        </h1>
        <p className="text-muted text-sm">{agents?.length || 0} agents flagged for review</p>
      </div>

      <AgentsTable agents={(agents as unknown as AdminAgent[]) || []} />
    </div>
  );
}
