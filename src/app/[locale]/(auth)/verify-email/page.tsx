"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { resendVerificationEmail } from "@/lib/actions/auth";
import { Link } from "@/i18n/navigation";

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleResend() {
    setIsLoading(true);
    try {
      // In a real app, you'd get the email from session or URL params
      const result = await resendVerificationEmail("");
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Verification email resent!");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <Card className="border-border/30 bg-card/60 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center pb-2 pt-8 px-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <MailCheck className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">Check Your Email</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            We&apos;ve sent a verification link to your email address. Click the link to verify your account and get started.
          </p>
        </CardHeader>
        <CardContent className="px-8 pb-8 pt-4 text-center">
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Resend Verification Email
            </Button>
            <p className="text-sm text-muted-foreground">
              <Link href="/login" className="text-primary hover:underline font-medium">
                Back to Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
