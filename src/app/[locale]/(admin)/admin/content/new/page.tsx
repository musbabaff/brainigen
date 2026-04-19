"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
const TiptapEditor = dynamic(() => import("@/components/admin/TiptapEditor").then(mod => mod.TiptapEditor), {
  ssr: false,
  loading: () => <div className="h-96 w-full animate-pulse bg-secondary rounded-lg" />
});
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Image as ImageIcon, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const LANGUAGES = ["EN", "TR", "AZ", "RU", "DE", "FR", "ES", "AR"];

export default function BlogPostEditor() {
  const [activeLang, setActiveLang] = useState("EN");
  const [content, setContent] = useState<Record<string, string>>({});
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [tags, setTags] = useState<string[]>(["AI", "Automation"]);
  const [newTag, setNewTag] = useState("");

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Draft saved successfully.");
    }, 1000);
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleAutoTranslate = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 3000)),
      {
        loading: 'Translating to 7 languages with AI...',
        success: 'Translation complete! Please review.',
        error: 'Translation failed.'
      }
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] bg-background">
      
      {/* Settings Panel (Left Sidebar) */}
      <div className="w-full lg:w-[320px] flex flex-col border-r border-border/50 bg-secondary/10">
        <div className="p-4 border-b border-border/50 font-semibold flex items-center gap-2">
          Post Settings
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            
            {/* Status & Date */}
            <div className="space-y-3">
              <Label>Status</Label>
              <Select defaultValue="draft">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Featured Image */}
            <div className="space-y-3">
              <Label>Featured Image</Label>
              <div className="aspect-video w-full border-2 border-dashed border-border/50 rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:bg-secondary/20 hover:border-primary/50 transition-colors cursor-pointer group">
                <ImageIcon className="h-8 w-8 mb-2 group-hover:text-primary transition-colors" />
                <span className="text-sm">Click to upload</span>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <Label>Categories</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="product">Product Updates</SelectItem>
                  <SelectItem value="ai">AI Insights</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                <AnimatePresence>
                  {tags.map(tag => (
                    <motion.div 
                      key={tag} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-destructive text-muted-foreground">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <Input 
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyDown={addTag}
                placeholder="Type and press enter..."
                className="text-sm"
              />
            </div>

            {/* SEO Settings */}
            <div className="space-y-3 pt-4 border-t border-border/50">
              <Label className="flex items-center gap-2">
                <Globe className="h-4 w-4" /> SEO Configuration
              </Label>
              <div className="space-y-2">
                <Input placeholder="Meta Title" className="text-sm" />
                <Input placeholder="Meta Description" className="text-sm" />
                <Input placeholder="Focus Keyword" className="text-sm" />
              </div>
            </div>

          </div>
        </ScrollArea>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Editor Topbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/95 backdrop-blur z-20">
          <div className="flex items-center gap-1 overflow-x-auto">
            {LANGUAGES.map(lang => (
              <Button 
                key={lang}
                variant={activeLang === lang ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveLang(lang)}
                className={cn("px-3 rounded-full text-xs font-medium", activeLang === lang && "bg-primary")}
              >
                {lang}
              </Button>
            ))}
            <Button variant="outline" size="sm" onClick={handleAutoTranslate} className="ml-2 rounded-full text-xs" title="Auto-translate via AI">
              <Sparkles className="h-3 w-3 mr-1 text-primary" /> Auto-Translate
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground mr-2 hidden sm:inline-block">Last saved: Just now</span>
            <Button variant="ghost" size="sm" onClick={() => window.open('/blog/preview', '_blank')}>
              <Play className="h-4 w-4 mr-2" /> Preview
            </Button>
            <Button variant="secondary" size="sm" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            <Button size="sm" className="bg-[#5B4FE9] hover:bg-[#5B4FE9]/90 text-white">
              Publish
            </Button>
          </div>
        </div>

        {/* Editor Content Area */}
        <ScrollArea className="flex-1 bg-background">
          <div className="max-w-4xl mx-auto px-6 py-10">
            <input 
              type="text"
              placeholder={`Post Title (${activeLang})`}
              className="w-full text-4xl md:text-5xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/40 mb-6 text-foreground"
              value={titles[activeLang] || ""}
              onChange={(e) => setTitles({ ...titles, [activeLang]: e.target.value })}
            />
            
            <div className="mb-8">
              <input 
                type="text"
                placeholder="Write a brief excerpt or subtitle..."
                className="w-full text-xl bg-transparent border-none outline-none placeholder:text-muted-foreground/50 text-muted-foreground"
              />
            </div>

            {/* Prosemirror Tiptap Editor */}
            <TiptapEditor 
              content={content[activeLang] || ""} 
              onChange={(val) => setContent({ ...content, [activeLang]: val })} 
              storageKey={`blog-draft-${activeLang}`}
            />
          </div>
        </ScrollArea>
      </div>

    </div>
  );
}
// We need to import X and Sparkles locally since we used them in the file
import { X, Sparkles } from "lucide-react";
