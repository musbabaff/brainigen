'use client';

import { useState, useRef, useEffect } from 'react';
import { Brain, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  data?: unknown;
};

const SUGGESTIONS = [
  "How many users signed up this month?",
  "What are the top 5 most active agents?",
  "Show me failed payments this week",
  "Which users haven't logged in for 30 days?",
];

export function AdminAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your admin assistant. Ask me anything about your Brainigen data — users, agents, billing, analytics. I'll query the database and give you real answers.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error('Failed');

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.content, data: data.queryResult }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: "Sorry, I couldn't process that. Please try rephrasing." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center z-40"
        aria-label="Open AI Assistant"
      >
        <Brain className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] bg-surface border-l border-border shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-soft flex items-center justify-center">
                    <Brain className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <div className="font-semibold">Admin AI Assistant</div>
                    <div className="text-xs text-muted">Powered by Brainigen</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-md hover:bg-surface-2 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.role === 'user' ? 'bg-surface-2' : 'bg-brand-soft'
                    }`}>
                      {msg.role === 'user' ? (
                        <span className="text-xs font-semibold">You</span>
                      ) : (
                        <Sparkles className="w-4 h-4 text-brand" />
                      )}
                    </div>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      msg.role === 'user'
                        ? 'bg-foreground text-background rounded-br-sm'
                        : 'bg-surface-2 rounded-bl-sm'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      {msg.data ? (
                        <pre className="mt-2 p-2 bg-surface-3 rounded text-xs overflow-x-auto">
                          {JSON.stringify(msg.data, null, 2)}
                        </pre>
                      ) : null}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-soft flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-brand animate-spin" />
                    </div>
                    <div className="bg-surface-2 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-muted">
                      Analyzing your data...
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>

              {messages.length === 1 && (
                <div className="px-5 pb-3">
                  <div className="text-xs text-muted mb-2">Try asking:</div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setInput(s)}
                        className="text-xs px-3 py-1.5 rounded-full bg-surface-2 border border-border hover:border-border-strong transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                    placeholder="Ask anything about your data..."
                    disabled={loading}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-surface-2 border border-border focus:border-brand focus:outline-none text-sm"
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="px-4 py-2.5 bg-foreground text-background rounded-lg hover:bg-foreground/90 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
