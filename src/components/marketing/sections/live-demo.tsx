'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const suggestedQuestions = [
  'What can Brainigen do?',
  'How much does it cost?',
  'Can I bring my own LLM?',
  'How fast can I deploy?',
];

const demoResponses: Record<string, string> = {
  'What can Brainigen do?': 'Brainigen lets you build, deploy, and manage AI agents that automate customer support, sales, onboarding, and more. Our agents understand context, learn from conversations, and integrate with 50+ tools.',
  'How much does it cost?': 'We offer a free tier with 1 agent and 100 messages/month. Our Pro plan starts at $49/mo with 10 agents and 50k messages. Enterprise pricing is custom — contact us for details.',
  'Can I bring my own LLM?': 'Absolutely! Brainigen supports OpenAI, Anthropic, Google, Mistral, Llama, and any OpenAI-compatible API. You can even switch models per agent.',
  'How fast can I deploy?': 'Most teams deploy their first agent in under 5 minutes using our templates. Custom agents with knowledge bases typically take 30 minutes to an hour.',
};

export function LiveDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hi! I'm Nova, Brainigen's AI assistant. Ask me anything about our platform, or try one of the suggestions below." },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = demoResponses[text.trim()] ||
        "That's a great question! In a production environment, I'd be connected to Brainigen's knowledge base and could give you a detailed answer. For now, try asking about pricing, features, or deployment.";

      const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  };

  return (
    <section className="py-20 lg:py-28 bg-[hsl(var(--surface-2))]">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: CTA */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h2 mb-4">Try Brainigen right now</h2>
            <p className="text-lead mb-8">
              Chat with Nova, our demo agent. No signup required — just type and see the magic.
            </p>
            <ul className="space-y-3 mb-8">
              {['Responds in under 200ms', 'Understands context & follow-ups', 'Powered by RAG retrieval', 'Works in 50+ languages'].map(b => (
                <li key={b} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--brand))] shrink-0" />
                  <span className="text-[hsl(var(--muted))]">{b}</span>
                </li>
              ))}
            </ul>
            <a
              href="/register"
              className="inline-flex items-center gap-2 h-11 px-6 bg-[hsl(var(--fg))] text-[hsl(var(--bg))] rounded-lg text-sm font-medium hover:opacity-90 transition-all"
            >
              Build your own agent <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Right: Chat */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] overflow-hidden shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-[hsl(var(--border))] bg-[hsl(var(--surface-2))]">
              <div className="h-8 w-8 rounded-full bg-[hsl(var(--brand)/0.15)] flex items-center justify-center">
                <Bot className="h-4 w-4 text-[hsl(var(--brand))]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">Nova</div>
                <div className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted))]">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online
                </div>
              </div>
              <span className="text-[10px] text-[hsl(var(--muted-2))]">Powered by Brainigen</span>
            </div>

            {/* Messages */}
            <div className="h-[360px] overflow-y-auto p-4 space-y-4">
              <AnimatePresence mode="popLayout">
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="h-6 w-6 rounded-full bg-[hsl(var(--brand)/0.15)] flex items-center justify-center shrink-0 mt-1">
                        <Bot className="h-3 w-3 text-[hsl(var(--brand))]" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[hsl(var(--brand))] text-white'
                        : 'bg-[hsl(var(--surface-2))] text-[hsl(var(--fg))]'
                    }`}>
                      {msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div className="h-6 w-6 rounded-full bg-[hsl(var(--surface-3))] flex items-center justify-center shrink-0 mt-1">
                        <User className="h-3 w-3 text-[hsl(var(--muted))]" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                  <div className="h-6 w-6 rounded-full bg-[hsl(var(--brand)/0.15)] flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-[hsl(var(--brand))]" />
                  </div>
                  <div className="bg-[hsl(var(--surface-2))] rounded-lg px-4 py-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-[hsl(var(--muted-2))] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 rounded-full bg-[hsl(var(--muted-2))] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 rounded-full bg-[hsl(var(--muted-2))] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggested questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {suggestedQuestions.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs border border-[hsl(var(--border))] rounded-full px-3 py-1.5 hover:bg-[hsl(var(--surface-2))] transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-[hsl(var(--border))]">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-[hsl(var(--surface-2))] border border-[hsl(var(--border))] rounded-lg px-3 py-2 text-sm outline-none focus:border-[hsl(var(--brand))] transition-colors"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="h-9 w-9 rounded-lg bg-[hsl(var(--brand))] text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
