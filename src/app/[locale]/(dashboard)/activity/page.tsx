'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Plus, MessageSquare, CheckCircle2, AlertCircle, CreditCard, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

// Mock data until DB is fully connected
const mockActivities = [
  { id: '1', type: 'login', title: 'Logged in', time: '10 mins ago', date: 'Today' },
  { id: '2', type: 'agent_created', title: 'Created Support Bot', time: '2 hours ago', date: 'Today' },
  { id: '3', type: 'settings_changed', title: 'Updated Profile', time: '5 hours ago', date: 'Today' },
  { id: '4', type: 'payment_success', title: 'Subscription Renewed', time: '1 day ago', date: 'Yesterday' },
];

const icons: Record<string, any> = {
  login: Activity,
  agent_created: Plus,
  settings_changed: CheckCircle2,
  payment_success: CreditCard,
  error: AlertCircle,
};

export default function ActivityPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">Activity Log</h1>
          <p className="text-sm text-muted-foreground mt-1">Audit trail of all actions in your account.</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          <Download className="h-3 w-3 mr-1" /> Export CSV
        </Button>
      </div>

      <Card className="border-border/30 bg-card/60">
        <CardContent className="p-0">
          <div className="p-4 border-b border-border/20 flex gap-2 overflow-x-auto">
            {['All', 'Agents', 'Billing', 'Security'].map(f => (
              <Button 
                key={f} 
                variant={filter === f.toLowerCase() ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter(f.toLowerCase())}
                className="text-xs"
              >
                {f}
              </Button>
            ))}
          </div>
          
          <div className="divide-y divide-border/10">
            {mockActivities.map(activity => {
              const Icon = icons[activity.type] || Activity;
              return (
                <div key={activity.id} className="p-4 flex items-start gap-4 hover:bg-accent/30 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time} · {activity.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
