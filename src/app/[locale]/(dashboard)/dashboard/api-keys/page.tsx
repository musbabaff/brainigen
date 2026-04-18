"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockApiKeys } from "@/lib/mock-data";
import { Plus, Copy, Trash2, Key, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ApiKeysPage() {
  function copyKey(key: string) {
    navigator.clipboard.writeText(key);
    toast.success("API key copied to clipboard!");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">API Keys</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your API keys for programmatic access.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 cursor-pointer" onClick={() => toast.info("Key generation coming soon (Demo)")}>
          <Plus className="h-4 w-4 mr-2" /> Generate New Key
        </Button>
      </div>

      <Card className="border-border/30 bg-card/60">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border/20">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Name</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Key</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Created</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Last Used</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4"></th>
              </tr></thead>
              <tbody>
                {mockApiKeys.map((key) => (
                  <tr key={key.id} className="border-b border-border/10 hover:bg-accent/30 transition-colors">
                    <td className="p-4 font-medium flex items-center gap-2">
                      <Key className="h-3.5 w-3.5 text-muted-foreground" /> {key.name}
                    </td>
                    <td className="p-4">
                      <code className="text-xs font-mono bg-secondary/50 px-2 py-1 rounded">
                        {key.key.slice(0, 14)}...{key.key.slice(-4)}
                      </code>
                    </td>
                    <td className="p-4 text-muted-foreground">{key.createdAt}</td>
                    <td className="p-4 text-muted-foreground">{key.lastUsed}</td>
                    <td className="p-4">
                      <Badge variant="outline" className={cn("text-[10px]",
                        key.status === "active" ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10" : "border-destructive/30 text-destructive bg-destructive/10"
                      )}>{key.status}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="sm" className="h-7 text-xs cursor-pointer" onClick={() => copyKey(key.key)}><Copy className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs cursor-pointer text-destructive hover:text-destructive"><Trash2 className="h-3 w-3" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/30 bg-card/60">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">API Documentation</p>
            <p className="text-xs text-muted-foreground">Learn how to integrate with the Brainigen API.</p>
          </div>
          <Button variant="outline" size="sm" className="cursor-pointer text-xs">
            <ExternalLink className="h-3 w-3 mr-1" /> View Docs
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
