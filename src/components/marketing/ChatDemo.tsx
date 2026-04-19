"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  X, 
  Send, 
  Minus, 
  Bot, 
  Copy, 
  Trash2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { easings } from "@/lib/animations";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";

export function ChatDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use Vercel AI SDK useChat
  // API route defaults to /api/chat if not specified, so we point it to our custom route
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading,
    error,
    setMessages
  } = useChat({
    // @ts-expect-error - Next.js AI SDK type mismatch
    api: '/api/chat/demo',
    id: 'brainigen-demo',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi! I'm Nova, Brainigen's AI assistant. Ask me anything about our AI agents, pricing, or services."
      }
    ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResponse: (response: any) => {
        if(response.status === 429) {
            toast.error("You've chatted a lot! Book a call for more ↓");
        }
    },
    onError: (err: Error) => toast.error(err.message || "An error occurred.")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  // Mark unread as false when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setHasUnread(false), 0);
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (isOpen) {
      if (!isMinimized) setIsMinimized(true);
      else setIsOpen(false);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Chat cleared! How else can I help you today?"
      }
    ]);
    toast.success("Chat history cleared");
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Message copied!");
  };

  const suggestedQuestions = [
    "What do you offer?",
    "How much does an AI agent cost?",
    "Can I book a call?",
    "Show me examples"
  ];

  const handleSuggestedClick = (q: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fakeEvent = new Event('submit') as any;
    fakeEvent.preventDefault = () => {};
    
    // We need to set input and then submit
    // useChat provides append to directly add a message
    // but the easiest way that triggers streaming correctly is a small timeout
    
    // Create a synthetic form event to pass to handleSubmit
    const syntheticEvent = {
        preventDefault: () => {}
    } as React.FormEvent<HTMLFormElement>;
    
    // A slightly hacky but reliable way with useChat when input isn't state-bound directly
    // is to use append if available, or simulate input change then submit.
    // Assuming useChat provides append (it usually does):
    // If not, we have to rely on standard input flow.
    const nativeEvent = { target: { value: q } } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(nativeEvent);
    
    setTimeout(() => {
      handleSubmit(syntheticEvent);
    }, 50);
  };

  return (
    <div className="fixed bottom-4 right-4 z-100 md:bottom-8 md:right-8 flex flex-col items-end">
      
      {/* --- Chat Window --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "60px" : "600px" 
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: easings.easeOutExpo }}
            className={cn(
              "w-[calc(100vw-2rem)] sm:w-[400px] bg-background/90 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4",
              isMinimized ? "h-[60px]" : "h-[600px] max-h-[80vh]"
            )}
          >
            {/* Header */}
            <div 
              className="px-4 py-3 border-b border-border/30 bg-secondary/30 flex items-center justify-between cursor-pointer"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Bot className="h-4 w-4" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-none mb-1">Nova</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={(e) => { e.stopPropagation(); clearChat(); }}
                  title="Clear Chat"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={(e) => { e.stopPropagation(); handleClose(); }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {messages.map((m: any) => (
                    <motion.div 
                      key={m.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex flex-col max-w-[85%]",
                        m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                      )}
                    >
                      <div className={cn(
                        "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                        m.role === 'user' 
                          ? "bg-primary text-primary-foreground rounded-tr-sm" 
                          : "bg-secondary text-foreground rounded-tl-sm border border-border/50"
                      )}>
                        {m.content}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-muted-foreground px-1">
                           {m.role === 'user' ? 'You' : 'Nova'}
                        </span>
                        {m.role === 'assistant' && (
                          <button 
                            onClick={() => copyMessage(m.content)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Copy message"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex max-w-[85%] mr-auto items-start"
                    >
                      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-secondary border border-border/50 flex items-center gap-1.5">
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" 
                          animate={{ y: [0, -3, 0] }} 
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" 
                          animate={{ y: [0, -3, 0] }} 
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" 
                          animate={{ y: [0, -3, 0] }} 
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {error && (
                     <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-2.5 rounded-xl flex items-start gap-2">
                         <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                         <p>{error.message === "Too Many Requests" ? "You've reached the demo limit. Book a call to see more!" : "Failed to send message. Please try again."}</p>
                     </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2 flex flex-wrap gap-2">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSuggestedClick(q)}
                        className="text-xs px-3 py-1.5 bg-secondary hover:bg-accent border border-border/50 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Area */}
                <div className="p-3 border-t border-border/30 bg-background/50">
                  <form 
                    onSubmit={handleSubmit}
                    className="relative flex items-end gap-2"
                  >
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ask Nova anything..."
                      className="pr-10 bg-secondary/50 border-border/50 focus-visible:ring-primary/30 rounded-xl"
                      maxLength={500}
                    />
                    <Button 
                      type="submit" 
                      size="icon"
                      disabled={isLoading || !input.trim()}
                      className="absolute right-1 bottom-1 h-8 w-8 rounded-lg bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                  <div className="flex items-center justify-between mt-2 px-1">
                    <span className="text-[10px] text-muted-foreground">
                      Powered by Brainigen AI
                    </span>
                    <Link href="/demo" className="text-[10px] text-primary hover:underline font-medium">
                      Open full demo →
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Floating Button --- */}
      <motion.button
        onClick={handleToggle}
        className={cn(
          "relative flex items-center justify-center h-14 w-14 rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95",
          isOpen && !isMinimized ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground"
        )}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen && !isMinimized ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageSquare className="h-6 w-6" />
            {hasUnread && (
              <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-background animate-pulse" />
            )}
          </>
        )}
      </motion.button>
    </div>
  );
}
