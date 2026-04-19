"use client";

import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Clock, Calendar, Mail } from "lucide-react";

const CATEGORIES = ["All", "AI Agents", "Engineering", "Company News", "Tutorials", "Product Updates"];

const FEATURED_POST = {
  slug: "future-of-autonomous-agents",
  title: "The Future of Autonomous AI Agents in Enterprise Software",
  excerpt: "How companies are moving beyond simple chatbots to deploy autonomous agents that can plan, execute, and evaluate complex workflows without human intervention.",
  category: "AI Agents",
  author: "Alex Rivera",
  date: "Oct 12, 2026",
  readingTime: "8 min read",
  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200&h=600",
  authorAvatar: "https://i.pravatar.cc/150?u=alex"
};

const POSTS = [
  {
    slug: "implementing-rag-pipelines",
    title: "How to Implement RAG Pipelines Using Brainigen SDK",
    excerpt: "A comprehensive guide to building Retrieval-Augmented Generation pipelines that ground your LLMs in company data.",
    category: "Tutorials",
    author: "Sarah Chen",
    date: "Oct 15, 2026",
    readingTime: "12 min read",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800&h=500",
    authorAvatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    slug: "series-a-funding",
    title: "Announcing Brainigen's $15M Series A Funding",
    excerpt: "We're thrilled to announce our Series A led by Sequoia Capital to accelerate the development of our enterprise agent framework.",
    category: "Company News",
    author: "Marketing Team",
    date: "Oct 20, 2026",
    readingTime: "4 min read",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800&h=500",
    authorAvatar: "https://i.pravatar.cc/150?u=team"
  },
  {
    slug: "low-latency-ai",
    title: "Optimizing LLM Latency for Real-time Applications",
    excerpt: "Techniques for reducing time-to-first-token and achieving sub-500ms responses in production AI systems.",
    category: "Engineering",
    author: "David Kim",
    date: "Nov 02, 2026",
    readingTime: "10 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=500",
    authorAvatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    slug: "introducing-workspaces",
    title: "Product Update: Introducing Multi-Agent Workspaces",
    excerpt: "Create dedicated environments where multiple AI agents can collaborate on complex projects alongside your human team.",
    category: "Product Updates",
    author: "Elena Rodriguez",
    date: "Nov 15, 2026",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800&h=500",
    authorAvatar: "https://i.pravatar.cc/150?u=elena"
  }
];

export default function BlogListingPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-6 mb-16 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Brainigen <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-brand-accent">Journal</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Insights, tutorials, and news about the future of enterprise AI and autonomous agents.
            </p>
          </div>
          <div className="w-full md:w-auto relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-brand-accent rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative flex items-center w-full md:w-80 bg-background border border-border/50 rounded-lg p-1 shadow-sm">
              <Search className="h-4 w-4 ml-3 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="border-none shadow-none focus-visible:ring-0 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORIES.map((cat, i) => (
            <Button 
              key={cat}
              variant={i === 0 ? "default" : "secondary"}
              className="rounded-full shrink-0"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Featured Post */}
            <Link href={`/blog/${FEATURED_POST.slug}`} className="block group">
              <div className="relative rounded-2xl overflow-hidden aspect-2/1 mb-6">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={FEATURED_POST.image} 
                  alt={FEATURED_POST.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-primary/90 hover:bg-primary backdrop-blur-md">{FEATURED_POST.category}</Badge>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {FEATURED_POST.title}
              </h2>
              <p className="text-muted-foreground text-lg mb-4 line-clamp-2">
                {FEATURED_POST.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={FEATURED_POST.authorAvatar} alt={FEATURED_POST.author} className="w-6 h-6 rounded-full" />
                  <span className="font-medium text-foreground">{FEATURED_POST.author}</span>
                </div>
                <div className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {FEATURED_POST.date}</div>
                <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {FEATURED_POST.readingTime}</div>
              </div>
            </Link>

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {POSTS.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                  <div className="relative rounded-xl overflow-hidden aspect-video mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="backdrop-blur-md bg-background/80">{post.category}</Badge>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                    <span className="font-medium text-foreground">{post.author}</span>
                    <div className="flex items-center gap-3">
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <Button variant="outline" size="lg" className="rounded-full">Load More Articles</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Newsletter CTA */}
            <Card className="border-primary/20 bg-primary/5 shadow-none">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-2">Join our newsletter</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Get the latest AI insights and product updates delivered weekly.
                </p>
                <div className="space-y-2">
                  <Input placeholder="Enter your email" className="bg-background" />
                  <Button className="w-full">Subscribe</Button>
                </div>
              </CardContent>
            </Card>

            {/* Popular Posts */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                Trending Articles
              </h3>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Link key={i} href={`/blog/trending-${i}`} className="flex gap-4 group">
                    <div className="text-4xl font-bold text-muted-foreground/30 group-hover:text-primary transition-colors">
                      0{i}
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2 text-sm leading-tight">
                        {i === 1 ? "Fine-tuning Small Language Models for Local Execution" : i === 2 ? "The Ultimate Guide to Enterprise AI Security" : "How Brainigen's Orchestrator Manages Agent Swarms"}
                      </h4>
                      <div className="text-xs text-muted-foreground">Nov {10 + i}, 2026</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
