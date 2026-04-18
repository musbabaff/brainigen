"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Send, Code } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// List of all templates available for testing
const templates = [
  "WelcomeEmail",
  "EmailVerificationEmail",
  "PasswordResetEmail",
  "PaymentSuccessEmail",
  "PaymentFailedEmail",
  "SubscriptionRenewalEmail",
  "AgentCreatedEmail",
  "TicketReplyEmail",
  "UsageLimitWarningEmail",
  "NewBlogPostEmail",
  "MonthlyDigestEmail",
  "ContactFormEmail",
];

export default function DevEmailsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [testEmail, setTestEmail] = useState("test@example.com");
  const [isSending, setIsSending] = useState(false);

  const handleTestSend = async () => {
    setIsSending(true);
    // In a real implementation, this would call an API route to trigger the email
    await new Promise(r => setTimeout(r, 1000));
    toast.success(`Test ${selectedTemplate} sent to ${testEmail}`);
    setIsSending(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Email Template Dev Tool</h1>
          <p className="text-muted-foreground">Preview and test all React Email components.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1 border-border/30 h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Templates</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="flex flex-col gap-1">
                {templates.map(tpl => (
                  <button
                    key={tpl}
                    onClick={() => setSelectedTemplate(tpl)}
                    className={cn(
                      "text-left px-3 py-2 text-sm rounded-md transition-colors",
                      selectedTemplate === tpl 
                        ? "bg-primary text-primary-foreground font-medium" 
                        : "hover:bg-muted text-muted-foreground"
                    )}
                  >
                    {tpl}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Preview Area */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-border/30">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground mb-1 block">Test Recipient</Label>
                  <Input 
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="h-8 bg-secondary/30"
                  />
                </div>
                <div className="pt-5 flex gap-2">
                  <Button size="sm" variant="outline" className="h-8 gap-1.5">
                    <Code className="h-3.5 w-3.5" /> Source
                  </Button>
                  <Button size="sm" className="h-8 gap-1.5" onClick={handleTestSend} disabled={isSending}>
                    <Send className="h-3.5 w-3.5" /> 
                    {isSending ? "Sending..." : "Send Test"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/30 overflow-hidden">
              <CardHeader className="border-b border-border/10 bg-muted/20 pb-3">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-sm font-semibold">Preview: {selectedTemplate}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0 bg-[#e4e4e7] dark:bg-[#09090b] min-h-[600px] flex items-center justify-center py-10">
                {/* 
                  In a real Next.js app, you'd render an iframe pointing to an API route 
                  that returns the rendered HTML of the email.
                  For this demo, we'll display a placeholder since we can't easily SSR 
                  the React Email component directly in this client component without a server route.
                */}
                <div className="bg-white text-black p-8 rounded-xl shadow-xl max-w-[600px] w-full text-center">
                  <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-brand" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Live Preview Mode</h2>
                  <p className="text-sm text-gray-500 mb-6">
                    In development, this iframe renders the output of <code className="bg-gray-100 px-1 py-0.5 rounded">render(&lt;{selectedTemplate} /&gt;)</code>.
                  </p>
                  <p className="text-xs text-gray-400">
                    To view the actual emails, run the application and visit this route.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
