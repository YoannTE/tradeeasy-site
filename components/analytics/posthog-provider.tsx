"use client";

import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (!key || key.includes("placeholder")) {
      return;
    }

    import("posthog-js")
      .then((posthogModule) => {
        const posthog = posthogModule.default;
        posthog.init(key, {
          api_host: host || "https://app.posthog.com",
          loaded: (ph) => {
            if (process.env.NODE_ENV === "development") {
              ph.debug();
            }
          },
        });
      })
      .catch(() => {
        /* PostHog failed to load — skip silently */
      });
  }, []);

  return <>{children}</>;
}
