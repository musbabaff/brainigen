import type { LucideIcon } from "lucide-react";

// ─── Mock agent data ───
export type AgentStatus = "active" | "paused" | "draft";
export type AgentType = "chatbot" | "automation" | "assistant";

export interface Agent {
  id: string;
  name: string;
  description: string;
  type: AgentType;
  status: AgentStatus;
  model: string;
  messagesCount: number;
  lastActive: string;
  createdAt: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
}

export const mockAgents: Agent[] = [
  {
    id: "ag-001",
    name: "Customer Support Bot",
    description: "Handles common customer queries and routes complex issues to human agents.",
    type: "chatbot",
    status: "active",
    model: "GPT-4o",
    messagesCount: 12847,
    lastActive: "2 minutes ago",
    createdAt: "2026-03-15",
    systemPrompt: "You are a helpful customer support assistant for Brainigen...",
    temperature: 0.7,
    maxTokens: 2048,
  },
  {
    id: "ag-002",
    name: "Lead Qualifier",
    description: "Qualifies inbound leads based on company size, budget, and needs.",
    type: "assistant",
    status: "active",
    model: "GPT-4o-mini",
    messagesCount: 3421,
    lastActive: "15 minutes ago",
    createdAt: "2026-03-20",
    systemPrompt: "You are a lead qualification agent...",
    temperature: 0.5,
    maxTokens: 1024,
  },
  {
    id: "ag-003",
    name: "Invoice Processor",
    description: "Automatically extracts data from invoices and updates the accounting system.",
    type: "automation",
    status: "paused",
    model: "Claude 3.5 Sonnet",
    messagesCount: 856,
    lastActive: "3 days ago",
    createdAt: "2026-04-01",
    systemPrompt: "You are an invoice data extraction agent...",
    temperature: 0.2,
    maxTokens: 4096,
  },
  {
    id: "ag-004",
    name: "Onboarding Guide",
    description: "Guides new users through product setup and configuration.",
    type: "chatbot",
    status: "draft",
    model: "GPT-4o",
    messagesCount: 0,
    lastActive: "Never",
    createdAt: "2026-04-10",
    systemPrompt: "",
    temperature: 0.8,
    maxTokens: 2048,
  },
];

// ─── Mock stats ───
export interface StatCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

// ─── Mock chart data ───
export const mockChartData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString("en", { month: "short", day: "numeric" }),
    messages: Math.floor(Math.random() * 400 + 200),
    tokens: Math.floor(Math.random() * 50000 + 10000),
    apiCalls: Math.floor(Math.random() * 200 + 50),
  };
});

// ─── Mock activity ───
export interface Activity {
  id: string;
  type: "agent_created" | "message" | "deployment" | "error" | "billing";
  title: string;
  description: string;
  time: string;
}

export const mockActivities: Activity[] = [
  { id: "1", type: "message", title: "Customer Support Bot", description: "Handled 156 conversations today", time: "2 min ago" },
  { id: "2", type: "deployment", title: "Lead Qualifier deployed", description: "Successfully deployed to production", time: "1 hour ago" },
  { id: "3", type: "agent_created", title: "New agent created", description: "Onboarding Guide added as draft", time: "3 hours ago" },
  { id: "4", type: "billing", title: "Invoice generated", description: "April 2026 invoice ready for download", time: "1 day ago" },
  { id: "5", type: "error", title: "Rate limit reached", description: "Invoice Processor hit API rate limit", time: "2 days ago" },
  { id: "6", type: "message", title: "Lead Qualifier", description: "Qualified 23 leads this week", time: "3 days ago" },
];

// ─── Mock API Keys ───
export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
  status: "active" | "revoked";
}

export const mockApiKeys: ApiKey[] = [
  { id: "1", name: "Production Key", key: "bg_live_sk_1a2b3c4d5e6f7g8h9i0j", createdAt: "2026-03-15", lastUsed: "2 min ago", status: "active" },
  { id: "2", name: "Development Key", key: "bg_test_sk_9z8y7x6w5v4u3t2s1r0q", createdAt: "2026-03-20", lastUsed: "1 day ago", status: "active" },
  { id: "3", name: "Old Staging Key", key: "bg_test_sk_a1b2c3d4e5f6g7h8i9j0", createdAt: "2026-02-01", lastUsed: "30 days ago", status: "revoked" },
];

// ─── Mock invoices ───
export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  plan: string;
}

export const mockInvoices: Invoice[] = [
  { id: "INV-004", date: "Apr 1, 2026", amount: "$29.00", status: "pending", plan: "Starter" },
  { id: "INV-003", date: "Mar 1, 2026", amount: "$29.00", status: "paid", plan: "Starter" },
  { id: "INV-002", date: "Feb 1, 2026", amount: "$0.00", status: "paid", plan: "Free" },
  { id: "INV-001", date: "Jan 1, 2026", amount: "$0.00", status: "paid", plan: "Free" },
];
