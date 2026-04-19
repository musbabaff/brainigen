import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { ratelimits } from '@/lib/rate-limit';
import { NextRequest } from 'next/server';

const SYSTEM_PROMPTS: Record<string, string> = {
  sales: "You are a helpful sales agent for Brainigen, an AI agent platform. Answer questions about features, pricing, and help qualify if Brainigen is right for the user's needs. Keep responses short and conversational.",
  support: "You are a customer support agent for Brainigen. Help users understand how to use the platform, answer technical questions, and troubleshoot. Be friendly and precise.",
  writer: "You are a content writing assistant powered by Brainigen. Help the user write marketing copy, emails, social posts, and other content. Ask clarifying questions when needed.",
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await ratelimits.chatDemo.limit(ip);
  if (!success) {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const { messages, agentType } = await req.json();
  const systemPrompt = SYSTEM_PROMPTS[agentType] || SYSTEM_PROMPTS.support;

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    messages,
  });

  return result.toTextStreamResponse();
}
