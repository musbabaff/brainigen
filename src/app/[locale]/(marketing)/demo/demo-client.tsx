'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, Zap, MessageSquare } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

const AGENTS = [
  {
    id: 'sales',
    name: 'Sales Qualifier',
    icon: Zap,
    description: 'Qualifies leads and books meetings',
    greeting: "Hi! I help companies figure out if Brainigen is right for them. What business are you in?",
    suggestions: ["Tell me about Brainigen", "How much does it cost?", "Can I try it?"],
  },
  {
    id: 'support',
    name: 'Customer Support',
    icon: MessageSquare,
    description: 'Answers product questions 24/7',
    greeting: "Hello! I'm here to help with Brainigen questions. What can I help you with?",
    suggestions: ["How do I create an agent?", "What integrations exist?", "Is my data secure?"],
  },
  {
    id: 'writer',
    name: 'Content Assistant',
    icon: Sparkles,
    description: 'Creates marketing copy and emails',
    greeting: "Hey! I help write marketing content. What do you need?",
    suggestions: ["Write a product description", "Draft a cold email", "Create a tweet"],
  },
];

export function DemoPageClient() {
  const [activeAgent, setActiveAgent] = useState(AGENTS[0]);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: AGENTS[0].greeting },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const switchAgent = (agent: typeof AGENTS[0]) => {
    setActiveAgent(agent);
    setMessages([{ role: 'assistant', content: agent.greeting }]);
    setInput('');
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, agentType: activeAgent.id }),
      });

      if (!response.ok) throw new Error('Failed');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages([...newMessages, { role: 'assistant', content: '' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantContent += decoder.decode(value);
          setMessages([...newMessages, { role: 'assistant', content: assistantContent }]);
        }
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: "Sorry, I'm having trouble right now. Please try again soon." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-narrow py-24">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted mb-6">
          <Sparkles className="h-3.5 w-3.5 text-brand" />
          <span>Live demo — powered by Brainigen</span>
        </div>
        <h1 className="text-display mb-4">
          Try three AI agents
          <br />
          <span className="bg-linear-to-r from-brand to-purple-500 bg-clip-text text-transparent">
            right in your browser
          </span>
        </h1>
        <p className="text-lead">
          No signup required. Switch between agents to see what Brainigen can build.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {AGENTS.map((agent) => (
          <button
            key={agent.id}
            onClick={() => switchAgent(agent)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              activeAgent.id === agent.id
                ? 'border-brand bg-brand-soft'
                : 'border-border bg-surface hover:border-border-strong'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${
                activeAgent.id === agent.id ? 'bg-brand text-white' : 'bg-surface-2 text-muted'
              }`}>
                <agent.icon className="h-4 w-4" />
              </div>
              <div className="font-semibold">{agent.name}</div>
            </div>
            <div className="text-sm text-muted">{agent.description}</div>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-lg">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-surface-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-brand-soft flex items-center justify-center">
              <activeAgent.icon className="w-4 h-4 text-brand" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-surface" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm">{activeAgent.name}</div>
            <div className="text-xs text-muted">Online · Powered by Brainigen</div>
          </div>
        </div>

        <div className="h-[500px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-surface-2' : 'bg-brand-soft'
              }`}>
                {msg.role === 'user' 
                  ? <User className="h-4 w-4" /> 
                  : <Bot className="h-4 w-4 text-brand" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                msg.role === 'user'
                  ? 'bg-foreground text-background rounded-br-sm'
                  : 'bg-surface-2 rounded-bl-sm'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-soft flex items-center justify-center">
                <Bot className="h-4 w-4 text-brand" />
              </div>
              <div className="bg-surface-2 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{animationDelay:'0.15s'}} />
                  <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{animationDelay:'0.3s'}} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {activeAgent.suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="text-xs px-3 py-1.5 rounded-full bg-surface-2 border border-border hover:border-border-strong transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="p-3 border-t border-border bg-surface">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder={`Message ${activeAgent.name}...`}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-lg bg-surface-2 border border-border focus:border-brand focus:outline-none transition-colors text-sm"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 bg-foreground text-background rounded-lg hover:bg-foreground/90 disabled:opacity-50 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="text-xs text-muted mt-2 text-center">
            This is a demo. Rate-limited to 10 messages per hour.
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-muted mb-4">Ready to build your own?</p>
        <a
          href="/register"
          className="inline-flex items-center gap-2 h-11 px-6 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90"
        >
          Start free trial
        </a>
      </div>
    </div>
  );
}
