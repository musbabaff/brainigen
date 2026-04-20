// @ts-nocheck
import { generateText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { canAccessAdminPanel } from '@/lib/auth/permissions';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || !canAccessAdminPanel(profile.role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { messages } = await req.json();

  const result = await generateText({
    model: openai('gpt-4o-mini'),
    system: `You are an admin assistant for Brainigen, an AI agent SaaS. You help admins query and understand their data.

Use tools to get real data. Never fabricate numbers. Format answers clearly with specific numbers and helpful insights.`,
    messages,
    tools: {
      countUsers: tool({
        description: 'Count total users, optionally filtered',
        parameters: z.object({
          sinceDays: z.number().optional(),
          plan: z.string().optional(),
        }),
        execute: async ({ sinceDays, plan }) => {
          let query = supabase.from('profiles').select('*', { count: 'exact', head: true });
          if (sinceDays) {
            const date = new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000).toISOString();
            query = query.gte('created_at', date);
          }
          if (plan) query = query.eq('plan', plan);
          const { count } = await query;
          return { count, sinceDays, plan };
        },
      }),

      revenueAnalytics: tool({
        description: 'Get revenue metrics for a period',
        parameters: z.object({
          period: z.enum(['week', 'month', 'quarter', 'year']).default('month'),
        }),
        execute: async ({ period }) => {
          const days = { week: 7, month: 30, quarter: 90, year: 365 }[period];
          const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
          const { data } = await supabase
            .from('invoices')
            .select('amount, status')
            .gte('created_at', since);
          const paid = data?.filter(i => i.status === 'paid') || [];
          const total = paid.reduce((sum, i) => sum + Number(i.amount), 0);
          return { period, total, count: paid.length, failed: data?.filter(i => i.status === 'failed').length || 0 };
        },
      }),

      supportTickets: tool({
        description: 'Get support ticket count',
        parameters: z.object({
          status: z.enum(['open', 'pending', 'closed', 'all']).default('all'),
        }),
        execute: async ({ status }) => {
          let query = supabase.from('tickets').select('*', { count: 'exact', head: true });
          if (status !== 'all') query = query.eq('status', status);
          const { count } = await query;
          return { status, count };
        },
      }),

      inactiveUsers: tool({
        description: 'Find users inactive for N days',
        parameters: z.object({
          daysInactive: z.number().default(30),
        }),
        execute: async ({ daysInactive }) => {
          const cutoff = new Date(Date.now() - daysInactive * 24 * 60 * 60 * 1000).toISOString();
          const { count } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .lt('last_sign_in_at', cutoff);
          return { daysInactive, inactiveCount: count };
        },
      }),

      agentStats: tool({
        description: 'Get AI agents statistics',
        parameters: z.object({
          limit: z.number().default(5),
        }),
        execute: async ({ limit }) => {
          const { count: total } = await supabase.from('agents').select('*', { count: 'exact', head: true });
          const { count: active } = await supabase.from('agents').select('*', { count: 'exact', head: true }).eq('status', 'active');
          const { data: top } = await supabase.from('agents').select('id, name, type').eq('status', 'active').limit(limit);
          return { total, active, topAgents: top || [] };
        },
      }),
    },
    maxSteps: 5,
  });

  return Response.json({
    content: result.text,
    queryResult: result.toolCalls.length > 0 ? result.toolResults : null,
  });
}
