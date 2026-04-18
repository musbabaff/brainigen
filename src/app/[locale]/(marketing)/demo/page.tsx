"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bot, 
  Send, 
  Sparkles,
  Headset,
  PenTool,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { GridBackground } from "@/components/shared/GridBackground";

type AgentType = "sales" | "support" | "content";

export default function DemoPage() {
  const [activeAgent, setActiveAgent] = useState<AgentType>("sales");

  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading,
    setMessages
  } = useChat({
    // @ts-expect-error - Next.js AI SDK type mismatch
    api: '/api/chat/demo',
    id: `demo-page-${activeAgent}`,
    body: { agentType: activeAgent },
    initialMessages: [
      {
        id: 'welcome-sales',
        role: 'assistant',
        content: "Hi! I'm the Brainigen Sales Assistant. I can help you understand our services and book a consultation. How can I help you scale today?"
      }
    ],
    onError: (err: Error) => toast.error(err.message)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;

  const agents = [
    {
      id: "sales",
      name: "Sales Assistant",
      icon: <Briefcase className="h-5 w-5" />,
      desc: "Qualifies leads and books meetings",
      welcome: "Hi! I'm the Brainigen Sales Assistant. I can help you understand our services and book a consultation. How can I help you scale today?"
    },
    {
      id: "support",
      name: "Customer Support",
      icon: <Headset className="h-5 w-5" />,
      desc: "Answers FAQs and creates tickets",
      welcome: "Hello, I'm the Support AI. What issues are you facing today?"
    },
    {
      id: "content",
      name: "Content Writer",
      icon: <PenTool className="h-5 w-5" />,
      desc: "Drafts engaging marketing copy",
      welcome: "Hey there! Need some punchy copy or a blog outline? Let's brainstorm."
    }
  ];

  const handleAgentSwitch = (agentId: AgentType) => {
    setActiveAgent(agentId);
    const agent = agents.find(a => a.id === agentId);
    setMessages([
      {
        id: `welcome-${agentId}`,
        role: 'assistant',
        content: agent?.welcome || "Hello."
      }
    ]);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] pt-20 pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <GridBackground />
      </div>
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-brand-soft/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-12">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6"
           >
             <Sparkles className="h-3.5 w-3.5" />
             Live AI Demonstrations
           </motion.div>
           <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4">
             See Our Agents in Action
           </h1>
           <p className="text-muted-foreground max-w-2xl mx-auto">
             Switch between different specialized AI agents to see how we tune personalities, goals, and knowledge bases for specific business needs.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[600px]">
          
          {/* Agent Selector Sidebar */}
          <div className="flex flex-col gap-3 lg:col-span-1">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => handleAgentSwitch(agent.id as AgentType)}
                className={cn(
                  "flex flex-col items-start p-4 rounded-xl text-left transition-all duration-300 border",
                  activeAgent === agent.id 
                    ? "bg-primary/10 border-primary/30 shadow-md shadow-primary/5" 
                    : "bg-secondary/30 border-border/50 hover:bg-secondary/60 hover:border-border/80"
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "p-2 rounded-lg",
                    activeAgent === agent.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {agent.icon}
                  </div>
                  <span className="font-semibold">{agent.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{agent.desc}</p>
              </button>
            ))}
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3 h-[600px]">
             <Card className="h-full flex flex-col bg-card/60 backdrop-blur-xl border-border/40 shadow-2xl rounded-2xl overflow-hidden">
               <div className="p-4 border-b border-border/30 bg-secondary/40 flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{agents.find(a => a.id === activeAgent)?.name}</h2>
                    <p className="text-xs text-muted-foreground">Powered by Brainigen AI</p>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-6 space-y-6">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {messages.map((m: any) => (
                    <motion.div 
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex max-w-[80%]",
                        m.role === 'user' ? "ml-auto" : "mr-auto"
                      )}
                    >
                      <div className={cn(
                        "p-4 rounded-2xl text-sm leading-relaxed",
                        m.role === 'user' 
                          ? "bg-primary text-primary-foreground rounded-br-sm" 
                          : "bg-secondary border border-border/50 text-foreground rounded-bl-sm"
                      )}>
                        {m.content}
                      </div>
                    </motion.div>
                 ))}
                 
                 {isLoading && (
                    <div className="flex max-w-[80%] mr-auto">
                      <div className="p-4 rounded-2xl bg-secondary border border-border/50 rounded-bl-sm flex gap-1.5">
                        <motion.div className="w-2 h-2 rounded-full bg-muted-foreground/50" animate={{ y: [0,-4,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                        <motion.div className="w-2 h-2 rounded-full bg-muted-foreground/50" animate={{ y: [0,-4,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                        <motion.div className="w-2 h-2 rounded-full bg-muted-foreground/50" animate={{ y: [0,-4,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                      </div>
                    </div>
                 )}
               </div>

               <div className="p-4 border-t border-border/30 bg-background/40">
                 <form onSubmit={handleSubmit} className="flex items-end gap-2 relative">
                    <Input 
                      value={input}
                      onChange={handleInputChange}
                      placeholder={`Message ${agents.find(a => a.id === activeAgent)?.name}...`}
                      className="bg-secondary/50 border-border/50 h-12 rounded-xl pr-12 focus-visible:ring-primary/40"
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading || !input.trim()}
                      className="absolute right-1.5 bottom-1.5 h-9 w-9 rounded-lg bg-primary hover:bg-primary/90"
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                 </form>
               </div>
             </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
