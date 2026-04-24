import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Redis is initialized lazily via getSetting fallback.
// UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN remain in .env
// for build-time safety; at runtime, getSetting() can override them.
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || '';
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || '';

const redis = redisUrl && redisToken
  ? new Redis({ url: redisUrl, token: redisToken })
  : null;

function makeRatelimit(limiter: InstanceType<typeof Ratelimit>['limiter'], prefix: string): Ratelimit {
  if (!redis) {
    // Return a no-op pass-through limiter when Redis is not configured
    return { limit: async () => ({ success: true, limit: 999, remaining: 999, reset: 0, pending: Promise.resolve() }) } as unknown as Ratelimit;
  }
  return new Ratelimit({ redis, limiter, analytics: true, prefix });
}

export const rateLimit = makeRatelimit(Ratelimit.slidingWindow(10, "10 s"), "@upstash/ratelimit");

export const ratelimits = {
  chatDemo: makeRatelimit(Ratelimit.slidingWindow(10, "1 h"), "@upstash/ratelimit/demo"),
};

// Global standard rate limit check — safe no-op if Redis not configured
export async function checkRateLimit(ip: string) {
  if (!redisUrl || !rateLimit) {
    return { success: true };
  }
  return await rateLimit.limit(ip);
}
