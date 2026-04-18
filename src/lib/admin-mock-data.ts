// ─── Admin-specific mock data ───

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  company: string;
  role: "customer" | "admin" | "super_admin";
  plan: "free" | "starter" | "pro" | "enterprise";
  agentsCount: number;
  joinedAt: string;
  status: "active" | "suspended";
  initials: string;
}

export const mockAdminUsers: AdminUser[] = [
  { id: "u-001", name: "Sarah Chen", email: "sarah@techflow.com", company: "TechFlow Inc.", role: "customer", plan: "pro", agentsCount: 8, joinedAt: "Jan 15, 2026", status: "active", initials: "SC" },
  { id: "u-002", name: "Marcus Rodriguez", email: "marcus@scaleup.ai", company: "ScaleUp AI", role: "customer", plan: "starter", agentsCount: 3, joinedAt: "Feb 3, 2026", status: "active", initials: "MR" },
  { id: "u-003", name: "Elena Kowalski", email: "elena@novabridge.io", company: "NovaBridge", role: "customer", plan: "pro", agentsCount: 12, joinedAt: "Feb 18, 2026", status: "active", initials: "EK" },
  { id: "u-004", name: "James Wu", email: "james@datacraft.dev", company: "DataCraft", role: "customer", plan: "free", agentsCount: 1, joinedAt: "Mar 1, 2026", status: "active", initials: "JW" },
  { id: "u-005", name: "Ayşe Yılmaz", email: "ayse@quantum.tr", company: "Quantum Labs", role: "customer", plan: "starter", agentsCount: 4, joinedAt: "Mar 10, 2026", status: "active", initials: "AY" },
  { id: "u-006", name: "Tom Baker", email: "tom@legacy.co", company: "Legacy Corp", role: "customer", plan: "free", agentsCount: 0, joinedAt: "Mar 22, 2026", status: "suspended", initials: "TB" },
  { id: "u-007", name: "Nina Petrova", email: "nina@synapse.ai", company: "Synapse AI", role: "admin", plan: "enterprise", agentsCount: 25, joinedAt: "Jan 5, 2026", status: "active", initials: "NP" },
  { id: "u-008", name: "David Kim", email: "david@cloudsync.io", company: "CloudSync", role: "customer", plan: "starter", agentsCount: 2, joinedAt: "Apr 1, 2026", status: "active", initials: "DK" },
  { id: "u-009", name: "Fatima Al-Rashid", email: "fatima@nexgen.ae", company: "NexGen", role: "customer", plan: "pro", agentsCount: 7, joinedAt: "Apr 5, 2026", status: "active", initials: "FA" },
  { id: "u-010", name: "Alex Johnson", email: "alex@brainigen.com", company: "Brainigen", role: "super_admin", plan: "enterprise", agentsCount: 0, joinedAt: "Jan 1, 2026", status: "active", initials: "AJ" },
];

export interface AdminAgent {
  id: string;
  name: string;
  owner: string;
  ownerEmail: string;
  type: "chatbot" | "automation" | "assistant";
  model: string;
  status: "active" | "paused" | "draft";
  messages: number;
  createdAt: string;
}

export const mockAdminAgents: AdminAgent[] = [
  { id: "ag-001", name: "Customer Support Bot", owner: "Sarah Chen", ownerEmail: "sarah@techflow.com", type: "chatbot", model: "GPT-4o", status: "active", messages: 12847, createdAt: "Mar 15" },
  { id: "ag-002", name: "Lead Qualifier", owner: "Marcus Rodriguez", ownerEmail: "marcus@scaleup.ai", type: "assistant", model: "GPT-4o-mini", status: "active", messages: 3421, createdAt: "Mar 20" },
  { id: "ag-003", name: "Invoice Processor", owner: "Elena Kowalski", ownerEmail: "elena@novabridge.io", type: "automation", model: "Claude 3.5", status: "paused", messages: 856, createdAt: "Apr 1" },
  { id: "ag-004", name: "Onboarding Guide", owner: "James Wu", ownerEmail: "james@datacraft.dev", type: "chatbot", model: "GPT-4o", status: "draft", messages: 0, createdAt: "Apr 10" },
  { id: "ag-005", name: "Sales Assistant", owner: "Elena Kowalski", ownerEmail: "elena@novabridge.io", type: "assistant", model: "Claude 3.5", status: "active", messages: 5690, createdAt: "Feb 28" },
  { id: "ag-006", name: "HR Chatbot", owner: "Ayşe Yılmaz", ownerEmail: "ayse@quantum.tr", type: "chatbot", model: "GPT-4o", status: "active", messages: 2134, createdAt: "Mar 15" },
  { id: "ag-007", name: "Data Extractor", owner: "Nina Petrova", ownerEmail: "nina@synapse.ai", type: "automation", model: "Gemini 2.0", status: "active", messages: 8923, createdAt: "Jan 20" },
  { id: "ag-008", name: "Ticket Router", owner: "Fatima Al-Rashid", ownerEmail: "fatima@nexgen.ae", type: "automation", model: "GPT-4o-mini", status: "active", messages: 4210, createdAt: "Apr 5" },
];

export interface AdminTicket {
  id: string;
  user: string;
  email: string;
  subject: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "resolved" | "closed";
  assignedTo: string;
  createdAt: string;
}

export const mockAdminTickets: AdminTicket[] = [
  { id: "TK-015", user: "Sarah Chen", email: "sarah@techflow.com", subject: "Agent not responding to pricing queries", priority: "high", status: "in_progress", assignedTo: "Nina P.", createdAt: "Apr 15" },
  { id: "TK-014", user: "David Kim", email: "david@cloudsync.io", subject: "How to integrate with Shopify?", priority: "medium", status: "resolved", assignedTo: "Alex J.", createdAt: "Apr 10" },
  { id: "TK-013", user: "Tom Baker", email: "tom@legacy.co", subject: "Billing discrepancy on invoice", priority: "low", status: "open", assignedTo: "Unassigned", createdAt: "Apr 8" },
  { id: "TK-012", user: "Fatima Al-Rashid", email: "fatima@nexgen.ae", subject: "Custom model deployment request", priority: "high", status: "open", assignedTo: "Unassigned", createdAt: "Apr 7" },
  { id: "TK-011", user: "Marcus Rodriguez", email: "marcus@scaleup.ai", subject: "API rate limit increase request", priority: "medium", status: "in_progress", assignedTo: "Nina P.", createdAt: "Apr 5" },
];

export interface BlogPost {
  id: string;
  title: string;
  status: "draft" | "published" | "scheduled";
  author: string;
  date: string;
  views: number;
  tags: string[];
}

export const mockBlogPosts: BlogPost[] = [
  { id: "p-001", title: "How AI Agents Are Transforming Customer Support", status: "published", author: "Alex Johnson", date: "Apr 10, 2026", views: 2340, tags: ["AI", "Support"] },
  { id: "p-002", title: "Getting Started with Brainigen: A Complete Guide", status: "published", author: "Nina Petrova", date: "Apr 5, 2026", views: 1890, tags: ["Tutorial", "Guide"] },
  { id: "p-003", title: "The Future of Business Automation with AI", status: "draft", author: "Alex Johnson", date: "Apr 14, 2026", views: 0, tags: ["Automation", "AI"] },
  { id: "p-004", title: "5 Ways to Optimize Your AI Agent's Performance", status: "scheduled", author: "Nina Petrova", date: "Apr 20, 2026", views: 0, tags: ["Tips", "Performance"] },
];

export const mockRevenueData = Array.from({ length: 12 }, (_, i) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return {
    month: months[i],
    revenue: Math.floor(2000 + i * 1500 + Math.random() * 3000),
    newSubs: Math.floor(10 + Math.random() * 30),
    churn: Math.floor(2 + Math.random() * 8),
  };
});
