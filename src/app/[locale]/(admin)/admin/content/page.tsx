"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal, Filter, Edit, Copy, Trash2, Eye } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const DUMMY_POSTS = [
  {
    id: "1",
    title: "The Future of Autonomous AI Agents in Enterprise",
    author: "Alex Rivera",
    status: "published",
    date: "Oct 12, 2026",
    views: "12.5k",
    categories: ["AI", "Enterprise"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=200&h=120"
  },
  {
    id: "2",
    title: "How to Implement RAG Pipelines Using Brainigen SDK",
    author: "Sarah Chen",
    status: "draft",
    date: "Oct 15, 2026",
    views: "-",
    categories: ["Engineering", "Tutorial"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=200&h=120"
  },
  {
    id: "3",
    title: "Announcing Brainigen Series A Funding",
    author: "Marketing Team",
    status: "scheduled",
    date: "Oct 20, 2026",
    views: "-",
    categories: ["Company News"],
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=200&h=120"
  }
];

export default function ContentListPage() {
  const [filter, setFilter] = useState("all");
  
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground mt-1">Manage your multilingual blog posts and publications.</p>
        </div>
        <Link href="/admin/content/new">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border/50 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
          {["All", "Published", "Drafts", "Scheduled"].map(f => (
            <Button 
              key={f}
              variant={filter === f.toLowerCase() ? "secondary" : "ghost"} 
              size="sm"
              onClick={() => setFilter(f.toLowerCase())}
              className="rounded-full"
            >
              {f}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search posts..." 
              className="pl-9 bg-secondary/50 border-none"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card className="border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/30 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">Post</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Author</th>
                <th className="px-6 py-4 font-medium">Categories</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Views</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {DUMMY_POSTS.map(post => (
                <tr key={post.id} className="hover:bg-secondary/10 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-20 rounded-md overflow-hidden bg-secondary shrink-0 border border-border/50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                      </div>
                      <Link href={`/admin/content/new`} className="font-medium text-base hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={post.status === 'published' ? 'default' : post.status === 'scheduled' ? 'secondary' : 'outline'} className="capitalize">
                      {post.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                    {post.author}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {post.categories.map(c => (
                        <span key={c} className="text-[10px] uppercase tracking-wider bg-secondary/50 text-secondary-foreground px-2 py-0.5 rounded-sm whitespace-nowrap">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {post.views}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-secondary rounded-md">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" /> Edit Post
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" /> View Live
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
    </div>
  );
}
