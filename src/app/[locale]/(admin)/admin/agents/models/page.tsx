import { Brain, Check, X } from 'lucide-react';

const MODELS = [
  { provider: 'OpenAI', model: 'gpt-4o', enabled: true, costPer1M: 2.5, type: 'Chat' },
  { provider: 'OpenAI', model: 'gpt-4o-mini', enabled: true, costPer1M: 0.15, type: 'Chat' },
  { provider: 'Anthropic', model: 'claude-3-5-sonnet', enabled: false, costPer1M: 3.0, type: 'Chat' },
  { provider: 'Anthropic', model: 'claude-3-5-haiku', enabled: false, costPer1M: 1.0, type: 'Chat' },
  { provider: 'Google', model: 'gemini-2.0-flash', enabled: false, costPer1M: 0.1, type: 'Chat' },
  { provider: 'Groq', model: 'llama-3.3-70b', enabled: false, costPer1M: 0.59, type: 'Chat' },
];

export default function ModelsConfigPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h2 mb-1 flex items-center gap-2">
          <Brain className="w-6 h-6 text-brand" />
          AI Models Configuration
        </h1>
        <p className="text-muted text-sm">Enable/disable AI providers and models</p>
      </div>

      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-2 border-b border-border">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Provider</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Model</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Cost / 1M tokens</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MODELS.map((m) => (
              <tr key={`${m.provider}-${m.model}`} className="hover:bg-surface-2 transition-colors">
                <td className="px-4 py-3 font-medium text-sm">{m.provider}</td>
                <td className="px-4 py-3 font-mono text-sm">{m.model}</td>
                <td className="px-4 py-3 text-sm text-muted">{m.type}</td>
                <td className="px-4 py-3 text-sm">${m.costPer1M.toFixed(2)}</td>
                <td className="px-4 py-3 text-center">
                  {m.enabled ? (
                    <span className="inline-flex items-center gap-1 text-xs text-green-500">
                      <Check className="w-4 h-4" />
                      Enabled
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-muted">
                      <X className="w-4 h-4 opacity-40" />
                      Disabled
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-5 rounded-xl border border-border bg-surface-2">
        <p className="text-sm text-muted">
          <strong className="text-foreground">Note:</strong> Full model configuration with live API key management and per-plan toggles will be migrated to the Site Settings table in Part 5.
        </p>
      </div>
    </div>
  );
}
