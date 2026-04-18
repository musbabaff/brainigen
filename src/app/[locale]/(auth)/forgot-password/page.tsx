"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations/auth";
import { resetPassword } from "@/lib/actions/auth";
import { useState } from "react";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setIsLoading(true);
    try {
      const result = await resetPassword(data.email);
      if (result.error) {
        toast.error(result.error);
      } else {
        setSent(true);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
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
          <h1 className="text-2xl font-bold tracking-[-0.02em]">Reset Password</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {sent
              ? "Check your email for a reset link."
              : "Enter your email and we'll send you a reset link."}
          </p>
        </CardHeader>
        <CardContent className="px-8 pb-8 pt-4">
          {sent ? (
            <div className="flex flex-col items-center text-center py-6">
              <div className="h-14 w-14 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-7 w-7 text-success" />
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                If an account exists with that email, you&apos;ll receive a password reset link shortly.
              </p>
              <Link href="/login">
                <Button variant="outline" className="cursor-pointer">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 h-10 bg-background/50 border-border/40"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium cursor-pointer rounded-lg shadow-[0_2px_8px_rgba(91,79,233,0.3)] transition-all duration-200"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Send Reset Link
                </Button>
              </form>
              <p className="text-center text-sm text-muted-foreground mt-6">
                <Link href="/login" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Login
                </Link>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
