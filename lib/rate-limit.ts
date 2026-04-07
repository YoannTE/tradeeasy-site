/**
 * Simple in-memory rate limiter.
 * NOTE: In serverless (Vercel), the Map resets on every cold start.
 * This is "best effort" rate limiting, acceptable for an MVP.
 */
const requests = new Map<string, number[]>();

/**
 * Check if a request from the given IP is allowed.
 * @returns true if allowed, false if rate limit exceeded.
 */
export function rateLimit(
  ip: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  const timestamps = requests.get(ip) || [];
  const recent = timestamps.filter((t) => t > windowStart);

  if (recent.length >= limit) {
    return false;
  }

  recent.push(now);
  requests.set(ip, recent);

  // Cleanup old entries periodically to prevent memory leaks
  if (requests.size > 10000) {
    for (const [key, ts] of requests) {
      const filtered = ts.filter((t) => t > windowStart);
      if (filtered.length === 0) {
        requests.delete(key);
      } else {
        requests.set(key, filtered);
      }
    }
  }

  return true;
}
