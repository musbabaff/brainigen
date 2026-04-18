'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, User, Building, Briefcase, Zap, Bot, MessageSquare } from 'lucide-react';

const steps = [
  { id: 'welcome', title: 'Welcome', description: "Let's get you set up" },
  { id: 'type', title: 'User Type', description: 'How will you use Brainigen?' },
  { id: 'usecase', title: 'Use Case', description: 'What do you want to build?' },
  { id: 'agent', title: 'First Agent', description: 'Create your AI agent' },
  { id: 'invite', title: 'Team', description: 'Invite your team members' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const handleSkip = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#5B4FE9', '#10b981', '#3b82f6']
    });
    // In a real app, we would save to Supabase here
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((s, i) => (
              <div key={s.id} className="flex flex-col items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors duration-300 ${
                  i < step ? 'bg-primary border-primary text-primary-foreground' :
                  i === step ? 'border-primary text-primary' :
                  'border-muted text-muted-foreground'
                }`}>
                  {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className="text-[10px] mt-1 hidden sm:block text-muted-foreground">{s.title}</span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Card className="h-full border-border/30 bg-card/60 backdrop-blur flex flex-col">
                <CardHeader>
                  <CardTitle>{steps[step].title}</CardTitle>
                  <CardDescription>{steps[step].description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  
                  {step === 0 && (
                    <div className="text-center py-12">
                      <h2 className="text-3xl font-bold mb-4">Welcome to Brainigen</h2>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        We're excited to have you on board. Let's configure your account so you can start building powerful AI agents in minutes.
                      </p>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                      {[{ icon: User, label: 'Individual' }, { icon: Building, label: 'Company' }, { icon: Briefcase, label: 'Agency' }].map(item => (
                        <div key={item.label} className="border-2 border-border/50 hover:border-primary cursor-pointer rounded-xl p-6 flex flex-col items-center text-center transition-all hover:bg-primary/5">
                          <item.icon className="h-10 w-10 text-primary mb-3" />
                          <h3 className="font-semibold">{item.label}</h3>
                        </div>
                      ))}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                      {[{ icon: MessageSquare, label: 'Customer Support' }, { icon: Zap, label: 'Automation' }, { icon: Bot, label: 'Content Creation' }, { icon: Briefcase, label: 'Other' }].map(item => (
                        <div key={item.label} className="border border-border/50 hover:border-primary cursor-pointer rounded-xl p-4 flex items-center gap-3 transition-all hover:bg-primary/5">
                          <div className="p-2 bg-primary/10 rounded-lg"><item.icon className="h-5 w-5 text-primary" /></div>
                          <span className="font-medium">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Agent Name</label>
                        <input type="text" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="e.g. Support Assistant" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">System Prompt</label>
                        <textarea className="w-full flex min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="You are a helpful customer support agent..."></textarea>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4 py-4">
                      <p className="text-sm text-muted-foreground mb-4">Invite your team to collaborate on Brainigen. You can always do this later.</p>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Addresses</label>
                        <textarea className="w-full flex min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="colleague1@example.com, colleague2@example.com"></textarea>
                      </div>
                    </div>
                  )}

                </CardContent>
                <CardFooter className="flex justify-between border-t border-border/20 pt-4 pb-4">
                  <Button variant="ghost" onClick={handleSkip}>
                    Skip
                  </Button>
                  <Button onClick={handleNext}>
                    {step === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
