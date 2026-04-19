import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { z } from 'zod';

// System prompt defining Nova's personality and knowledge
const SYSTEM_PROMPT = `You are Nova, Brainigen's AI assistant demonstrator. 

Your role:
- Help visitors understand what Brainigen builds (AI agents, automation, custom AI integrations)
- Answer questions about our services, pricing, and process
- Showcase the quality of AI agents Brainigen can build
- Be professional, warm, and knowledgeable
- Keep responses concise (max 3-4 sentences for most responses)

Brainigen services:
1. AI Agent Development: Custom conversational AI ($1,500-$8,000)
2. Business Automation: Workflow automation with AI ($1,000-$5,000)
3. AI Integration: Embed AI into existing systems ($2,000-$10,000)
4. Consulting: AI strategy and roadmap ($500-$2,000)

Always end with a helpful CTA when appropriate: "Would you like to book a free discovery call?"

If asked about technical details you don't know: "That's a great question — let me connect you with a Brainigen engineer. You can book a call here."

NEVER make up information. Only use what's in this system prompt.`;

// Initialize Upstash Redis and Rate Limiter conditionally
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let ratelimit: Ratelimit | null = null;

if (redisUrl && redisToken) {
  const redis = new Redis({
    url: redisUrl,
    token: redisToken,
  });

  // Create a new ratelimiter, that allows 10 requests per 1 hour
  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, '1 h'),
    analytics: true,
  });
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting check
    if (ratelimit) {
      const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
      const { success, limit, reset, remaining } = await ratelimit.limit(
        `ratelimit_chat_${ip}`
      );

      if (!success) {
        return new Response(
          JSON.stringify({
            error: "You've chatted a lot! Book a call for more ↓",
            reset: reset,
          }),
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString(),
              'Content-Type': 'application/json',
            },
          }
        );
      }
    }

    // 2. Parse request
    const body = await req.json();
    const schema = z.object({
      messages: z.array(z.object({
        role: z.enum(["user", "assistant", "system", "tool"]),
        content: z.string()
      })),
      agentType: z.string().optional()
    });
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
    }
    const { messages, agentType } = parsed.data;

    // 3. Optional: Dynamic system prompt based on agentType (for the demo page)
    let dynamicPrompt = SYSTEM_PROMPT;
    
    if (agentType === 'sales') {
        dynamicPrompt = `You are a Sales Assistant AI built by Brainigen. Your goal is to qualify leads, highlight our premium AI solutions, and encourage users to book a consultation. Be persuasive but professional. Focus on ROI and efficiency. Keep responses to 2-3 sentences max.`;
    } else if (agentType === 'support') {
        dynamicPrompt = `You are a Customer Support AI built by Brainigen. Your goal is to answer questions about Brainigen's services helpfully and patiently. Be empathetic and clear. If you don't know, say you'll create a ticket. Keep responses to 2-3 sentences max.`;
    } else if (agentType === 'content') {
        dynamicPrompt = `You are a Content Writer AI built by Brainigen. Your goal is to showcase creative writing capabilities. Adopt a slightly more creative, engaging tone. Keep responses punchy and marketing-oriented. Keep responses to 2-3 sentences max.`;
    }

    // Ensure we don't process massive inputs
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.content.length > 500) {
        return new Response('Message exceeds 500 characters maximum.', { status: 400 });
    }

    // 4. Stream response using OpenAI via Vercel AI SDK
    // Note: requires process.env.OPENAI_API_KEY
    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: dynamicPrompt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: messages as any,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
