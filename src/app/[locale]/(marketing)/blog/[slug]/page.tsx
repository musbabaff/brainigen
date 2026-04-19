"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock, Calendar, Eye, Share2, Link as LinkIcon } from "lucide-react";

export default function BlogPostPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeHeading, setActiveHeading] = useState("introduction");

  // Dummy HTML content for the demo
  const htmlContent = `
    <h2 id="introduction">Introduction to Autonomous Agents</h2>
    <p>The landscape of enterprise software is undergoing a monumental shift. We are moving from a paradigm of <em>software-as-a-tool</em> to <em>software-as-an-agent</em>. This isn't just about chatbots answering questions; it's about autonomous systems capable of reasoning, planning, and executing multi-step workflows without human intervention.</p>
    
    <blockquote>
      "The next trillion-dollar company will be a one-person AI enterprise." — Sam Altman
    </blockquote>

    <p>Consider a traditional customer support workflow. A user submits a ticket. A human agent reads it, checks the internal knowledge base, fetches customer data from Stripe, verifies logs in Datadog, formulates a response, and possibly issues a refund. An autonomous agent can do all of this in seconds.</p>

    <h2 id="architecture">The Architecture of Autonomy</h2>
    <p>Building an autonomous agent requires more than just calling an LLM. It requires an orchestrator that manages state, memory, tools, and execution paths. At Brainigen, our framework consists of three core pillars:</p>
    
    <ul>
      <li><strong>Cognitive Engine:</strong> The LLM layer responsible for reasoning and planning.</li>
      <li><strong>Tool Use (RAG & APIs):</strong> How the agent interacts with the outside world.</li>
      <li><strong>Memory Systems:</strong> Short-term context and long-term vector storage.</li>
    </ul>

    <h3 id="implementation">Implementation Example</h3>
    <p>Here is a basic example of how you might initialize an agent using the Brainigen SDK:</p>

    <pre><code class="language-typescript">import { Agent, Tool } from "@brainigen/sdk";

const stripeRefundTool = new Tool({
  name: "issue_refund",
  description: "Issues a refund for a specific charge ID",
  execute: async (chargeId: string) => {
    // Implementation details...
    return { status: "success", amount: 150 };
  }
});

const supportAgent = new Agent({
  name: "SupportHero",
  instructions: "You are a tier-2 support agent capable of issuing refunds.",
  tools: [stripeRefundTool],
  model: "gpt-4o"
});

await supportAgent.run("The customer with charge ch_12345 requested a refund.");
</code></pre>

    <p>This code represents a monumental shift. The agent decides <strong>if</strong> and <strong>when</strong> to use the <code>stripeRefundTool</code> based on the context and instructions.</p>

    <h2 id="challenges">Challenges and Security</h2>
    <p>Of course, handing over the keys to autonomous systems introduces significant security risks. Prompt injection, hallucination, and unintended side effects are real threats. This is why enterprise adoption requires robust guardrails, human-in-the-loop approvals for sensitive actions, and deterministic state machines wrapped around the LLM core.</p>

    <h2 id="conclusion">Conclusion</h2>
    <p>We are just at the beginning of the autonomous agent era. As models get faster and context windows get larger, the capabilities of these systems will compound. The companies that learn to build and orchestrate agents today will dominate their industries tomorrow.</p>
  `;

  return (
    <div className="relative min-h-screen bg-background">
      
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-100 origin-left"
        style={{ scaleX }}
      />

      <article className="pb-24">
        
        {/* Cover Image */}
        <div className="relative w-full h-[50vh] md:h-[70vh] bg-secondary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000&h=1000" 
            alt="The Future of Autonomous AI Agents"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl -mt-32 relative z-10">
          
          <div className="max-w-4xl mx-auto">
            {/* Header Content */}
            <div className="mb-10 text-center md:text-left">
              <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Journal
              </Link>
              <div className="mb-6 flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge className="bg-primary/90 hover:bg-primary">AI Agents</Badge>
                <Badge variant="secondary">Enterprise</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                The Future of Autonomous AI Agents in Enterprise Software
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
                How companies are moving beyond simple chatbots to deploy autonomous agents that can plan, execute, and evaluate complex workflows without human intervention.
              </p>
              
              {/* Author Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-y border-border/50 gap-4">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://i.pravatar.cc/150?u=alex" alt="Alex Rivera" className="h-12 w-12 rounded-full border border-border/50" />
                  <div className="text-left">
                    <div className="font-semibold">Alex Rivera</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Oct 12, 2026</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 8 min read</span>
                      <span className="hidden sm:flex items-center gap-1"><Eye className="h-3 w-3" /> 12.5k views</span>
                    </div>
                  </div>
                </div>
                
                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground mr-2 font-medium">Share:</span>
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-full"><Share2 className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-full"><LinkIcon className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>

            {/* Layout Grid: Content + Sidebar */}
            <div className="flex flex-col lg:flex-row gap-12 relative">
              
              {/* Article Content */}
              <div className="flex-1 min-w-0">
                <div 
                  className="prose prose-lg prose-neutral dark:prose-invert max-w-none 
                    prose-headings:scroll-mt-24 
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-primary prose-blockquote:bg-secondary/30 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                    prose-img:rounded-2xl prose-img:border prose-img:border-border/50
                    prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-border/50"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-border/50 flex items-center gap-2">
                  <span className="text-sm font-semibold mr-2">Tags:</span>
                  <Badge variant="outline">LLMs</Badge>
                  <Badge variant="outline">Automation</Badge>
                  <Badge variant="outline">Architecture</Badge>
                </div>

                {/* Author Bio Box */}
                <div className="mt-12 p-8 rounded-2xl bg-secondary/50 border border-border/50 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://i.pravatar.cc/150?u=alex" alt="Alex Rivera" className="h-24 w-24 rounded-full border border-border" />
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold mb-2">Written by Alex Rivera</h3>
                    <p className="text-muted-foreground mb-4">Lead AI Engineer at Brainigen. Passionate about multi-agent systems, TypeScript, and pushing the boundaries of what enterprise software can do autonomously.</p>
                    <Button variant="outline" size="sm">Follow on Twitter</Button>
                  </div>
                </div>
              </div>

              {/* Table of Contents (Sticky Right) */}
              <div className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-32">
                  <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-muted-foreground">On this page</h4>
                  <nav className="flex flex-col gap-3 text-sm">
                    {[
                      { id: "introduction", label: "Introduction to Autonomous Agents" },
                      { id: "architecture", label: "The Architecture of Autonomy" },
                      { id: "implementation", label: "Implementation Example", sub: true },
                      { id: "challenges", label: "Challenges and Security" },
                      { id: "conclusion", label: "Conclusion" }
                    ].map((item) => (
                      <a 
                        key={item.id} 
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                          setActiveHeading(item.id);
                        }}
                        className={`transition-colors border-l-2 py-1 pl-4 ${
                          item.sub ? 'ml-4' : ''
                        } ${
                          activeHeading === item.id 
                            ? 'border-primary text-foreground font-medium' 
                            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                        }`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>

                  <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20">
                    <h4 className="font-bold mb-2">Build your own agent</h4>
                    <p className="text-sm text-muted-foreground mb-4">Start orchestrating AI workflows in minutes with Brainigen.</p>
                    <Button className="w-full">Get Started</Button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-20 border-t border-border/50 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Keep Reading</h2>
            <Button variant="ghost">View all <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Link key={i} href={`/blog/related-${i}`} className="group flex flex-col h-full">
                <div className="relative rounded-xl overflow-hidden aspect-video mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={`https://images.unsplash.com/photo-${i === 1 ? '1555949963-aa79dcee981c' : i === 2 ? '1518770660439-4636190af475' : '1497215728101-856f4ea42174'}?auto=format&fit=crop&q=80&w=600&h=400`} 
                    alt="Related post"
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {i === 1 ? "How to Implement RAG Pipelines Using Brainigen SDK" : i === 2 ? "Optimizing LLM Latency for Real-time Applications" : "Product Update: Introducing Multi-Agent Workspaces"}
                </h3>
                <div className="text-sm text-muted-foreground mt-auto pt-4 flex items-center justify-between">
                  <span>Oct 15, 2026</span>
                  <span>12 min read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
