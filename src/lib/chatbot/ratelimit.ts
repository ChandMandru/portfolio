import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Module scope — shared across warm invocations (per D-10)
// Only initialize if Upstash env vars are present
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(10, '1 m'), // D-09: 10 req/min per IP
      })
    : null;

export async function checkRateLimit(
  ip: string
): Promise<{ success: boolean }> {
  if (!ratelimit) {
    // Fail-open: no Upstash configured (local dev without Redis)
    return { success: true };
  }

  try {
    const { success } = await ratelimit.limit(ip);
    return { success };
  } catch {
    // Fail-open: Redis unreachable should not block legitimate visitors
    return { success: true };
  }
}
