"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const categories = ["All", "CRM", "Communication", "Email", "Storage", "Developer", "Analytics", "Payment"];

const integrations = [
  { name: "Salesforce", category: "CRM", desc: "Sync contacts, leads, and opportunities" },
  { name: "HubSpot", category: "CRM", desc: "Automate CRM workflows and contact management" },
  { name: "Pipedrive", category: "CRM", desc: "Connect deals and pipeline data" },
  { name: "Slack", category: "Communication", desc: "Send messages and receive notifications" },
  { name: "Discord", category: "Communication", desc: "Deploy agents in Discord servers" },
  { name: "Microsoft Teams", category: "Communication", desc: "Integrate agents into Teams channels" },
  { name: "Intercom", category: "Communication", desc: "Enhance live chat with AI agents" },
  { name: "Gmail", category: "Email", desc: "Read, send, and manage email workflows" },
  { name: "Outlook", category: "Email", desc: "Microsoft email integration" },
  { name: "Mailchimp", category: "Email", desc: "Automate email campaigns" },
  { name: "SendGrid", category: "Email", desc: "Transactional email automation" },
  { name: "Google Drive", category: "Storage", desc: "Access and process documents" },
  { name: "Dropbox", category: "Storage", desc: "File storage and sharing" },
  { name: "Notion", category: "Storage", desc: "Knowledge base and documentation" },
  { name: "Confluence", category: "Storage", desc: "Enterprise wiki integration" },
  { name: "GitHub", category: "Developer", desc: "Code review and issue management" },
  { name: "GitLab", category: "Developer", desc: "CI/CD and repository automation" },
  { name: "Linear", category: "Developer", desc: "Issue tracking and project management" },
  { name: "Jira", category: "Developer", desc: "Enterprise project management" },
  { name: "Vercel", category: "Developer", desc: "Deployment notifications and monitoring" },
  { name: "Supabase", category: "Developer", desc: "Database queries and auth management" },
  { name: "Mixpanel", category: "Analytics", desc: "User analytics and event tracking" },
  { name: "Amplitude", category: "Analytics", desc: "Product analytics integration" },
  { name: "Segment", category: "Analytics", desc: "Customer data platform" },
  { name: "Google Analytics", category: "Analytics", desc: "Website traffic and conversion data" },
  { name: "Stripe", category: "Payment", desc: "Payment processing and billing" },
  { name: "PayPal", category: "Payment", desc: "Payment gateway integration" },
  { name: "Shopify", category: "Payment", desc: "E-commerce store management" },
  { name: "Zendesk", category: "CRM", desc: "Customer support ticket management" },
  { name: "Freshdesk", category: "CRM", desc: "Helpdesk and support automation" },
];

export default function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = integrations.filter((i) => {
    const matchCategory = activeCategory === "All" || i.category === activeCategory;
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">
            Integrations
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] mb-6">
            Connect everything
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Brainigen integrates with {integrations.length}+ tools your team already uses.
            Connect your agents to any workflow.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-9 bg-card border-border/50"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                  activeCategory === cat
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {filtered.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.4, ease }}
            >
              <Card className="h-full border-border/40 bg-card/80 hover:border-border transition-colors duration-200 rounded-xl cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground">
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 mt-0.5">{item.category}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Request integration */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="text-center border-t border-border/30 pt-16"
        >
          <h2 className="text-2xl font-bold tracking-[-0.02em] mb-3">Don&apos;t see your tool?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Request an integration and we&apos;ll prioritize it based on demand.
          </p>
          <Link href="/contact">
            <Button variant="outline" className="cursor-pointer">
              Request integration <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
