export async function trackEvent(
  event: string,
  properties?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;

  try {
    const posthog = (await import("posthog-js")).default;
    posthog.capture(event, properties);
  } catch {
    /* PostHog not initialized — skip silently */
  }
}
