"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Mail, MapPin, Globe, ArrowRight, Loader2, CheckCircle2, Calendar, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Valid email required"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactForm = z.infer<typeof contactSchema>;

const faqs = [
  { q: "How quickly do you respond?", a: "We typically respond within 24 hours on business days." },
  { q: "Do you offer free consultations?", a: "Yes! Book a free 30-minute discovery call to discuss your needs." },
  { q: "Where is Brainigen located?", a: "Our headquarters is in Baku, Azerbaijan. We serve clients globally." },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(_data: ContactForm) {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setSubmitted(true);
    toast.success("Message sent successfully!");
  }

  return (
    <div className="space-y-20 py-16">
      {/* Hero */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
          <Sparkles className="h-3.5 w-3.5" /> Contact Us
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em]">Let&apos;s Build Something <span className="text-primary">Amazing</span></h1>
        <p className="mt-4 text-lg text-muted-foreground">Have a question or ready to start? We&apos;d love to hear from you.</p>
      </motion.section>

      {/* Form + Info */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <Card className="border-border/30 bg-card/60">
              <CardContent className="p-7">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="h-14 w-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="h-7 w-7 text-emerald-500" /></div>
                    <h3 className="text-lg font-bold">Thanks for reaching out!</h3>
                    <p className="text-sm text-muted-foreground mt-2">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Name *</Label>
                        <Input placeholder="John Doe" className="bg-background/50 border-border/40" {...register("name")} />
                        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Email *</Label>
                        <Input type="email" placeholder="john@example.com" className="bg-background/50 border-border/40" {...register("email")} />
                        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Company</Label>
                        <Input placeholder="Your company" className="bg-background/50 border-border/40" {...register("company")} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Service Interest *</Label>
                        <select className="w-full h-9 rounded-md border border-border/40 bg-background/50 px-3 text-sm" {...register("service")}>
                          <option value="">Select a service</option>
                          <option value="agents">AI Agent Development</option>
                          <option value="automation">Business Automation</option>
                          <option value="integration">AI Integration</option>
                          <option value="consulting">Consulting & Strategy</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.service && <p className="text-xs text-destructive">{errors.service.message}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Message *</Label>
                      <Textarea placeholder="Tell us about your project..." className="bg-background/50 border-border/40 min-h-[120px]" {...register("message")} />
                      {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 cursor-pointer h-10 shadow-[0_2px_8px_rgba(91,79,233,0.3)]">
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            <Card className="border-border/30 bg-card/60">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-start gap-3"><MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" /><div><p className="text-sm font-semibold">Office</p><p className="text-xs text-muted-foreground">Baku, Azerbaijan</p></div></div>
                <div className="flex items-start gap-3"><Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" /><div><p className="text-sm font-semibold">Email</p><p className="text-xs text-muted-foreground">hello@brainigen.com</p></div></div>
                <div className="flex items-start gap-3"><Globe className="h-4 w-4 text-primary mt-0.5 shrink-0" /><div><p className="text-sm font-semibold">Social</p><div className="flex gap-2 mt-1"><a href="https://twitter.com/brainigen" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">Twitter</a><a href="https://linkedin.com/company/brainigen" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">LinkedIn</a><a href="https://github.com/brainigen" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">GitHub</a></div></div></div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <Calendar className="h-6 w-6 text-primary mx-auto mb-3" />
                <h3 className="text-sm font-bold mb-1">Book a Discovery Call</h3>
                <p className="text-xs text-muted-foreground mb-4">30-minute free consultation</p>
                <Button variant="outline" size="sm" className="cursor-pointer text-xs">Schedule a Call <ArrowRight className="h-3 w-3 ml-1" /></Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked</h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border/20 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left text-sm font-medium cursor-pointer hover:bg-accent/20 transition-colors">{faq.q}</button>
              {openFaq === i && <div className="px-4 pb-4 text-sm text-muted-foreground">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
