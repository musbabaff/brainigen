"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, Globe, FileText, Trash2, Search, Database } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mockKBs = [
  { id: "1", name: "Product Documentation", docs: 24, chunks: 1840, status: "ready" as const, updated: "2 hours ago" },
  { id: "2", name: "Support Knowledge Base", docs: 67, chunks: 5230, status: "ready" as const, updated: "1 day ago" },
  { id: "3", name: "Sales Playbook", docs: 12, chunks: 890, status: "processing" as const, updated: "Just now" },
];

export default function KnowledgeBasePage() {
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const filtered = mockKBs.filter((kb) => kb.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">Knowledge Base</h1>
          <p className="text-sm text-muted-foreground mt-1">Upload documents and build RAG-powered knowledge for your agents.</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)} className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer text-sm">
          <Plus className="h-4 w-4 mr-1.5" /> New Knowledge Base
        </Button>
      </div>

      {/* Create form */}
      {showCreate && (
        <Card className="border-border/40 bg-card/80 rounded-xl">
          <CardHeader className="pb-3">
            <h3 className="text-sm font-semibold">Create Knowledge Base</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name</label>
              <Input placeholder="e.g., Product Documentation" className="h-9 bg-secondary/40 border-border/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
              <Textarea placeholder="What kind of knowledge will this contain?" className="bg-secondary/40 border-border/30 min-h-[80px]" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border/40 bg-secondary/20 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-200 cursor-pointer">
                <Upload className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">Upload Files</span>
                <span className="text-[10px] text-muted-foreground">PDF, DOCX, TXT, MD</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border/40 bg-secondary/20 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-200 cursor-pointer">
                <Globe className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">Add URL</span>
                <span className="text-[10px] text-muted-foreground">Crawl web pages</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border/40 bg-secondary/20 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-200 cursor-pointer">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">Add Text</span>
                <span className="text-[10px] text-muted-foreground">Paste raw text</span>
              </button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-primary text-primary-foreground cursor-pointer text-xs">Create</Button>
              <Button size="sm" variant="outline" onClick={() => setShowCreate(false)} className="cursor-pointer text-xs">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search knowledge bases..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-9 bg-secondary/40 border-border/30" />
      </div>

      {/* Knowledge bases list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((kb) => (
          <Card key={kb.id} className="border-border/40 bg-card/80 hover:border-border transition-colors duration-200 rounded-xl cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="outline" className={cn("text-[10px] px-2 py-0", kb.status === "ready" ? "border-emerald-500/30 text-emerald-500" : "border-amber-500/30 text-amber-500")}>
                  {kb.status === "ready" ? "Ready" : "Processing"}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold mb-1">{kb.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{kb.docs} documents • {kb.chunks.toLocaleString()} chunks</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Updated {kb.updated}</span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive transition-colors" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
