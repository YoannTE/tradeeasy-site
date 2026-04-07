import { getPayload } from "payload";
import config from "@payload-config";

export interface SubscriptionData {
  status: string | null;
  type: string | null;
  nextRenewalDate: string | null;
  trialEndDate: string | null;
  trialActivatedAt: string | null;
}

/**
 * Get the latest subscription for a user.
 * Returns null if no subscription found or if DB is unavailable (dev fallback).
 */
export async function getLatestSubscription(
  userId: number | string,
): Promise<SubscriptionData | null> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "subscriptions",
      where: { user: { equals: userId } },
      sort: "-createdAt",
      limit: 1,
      overrideAccess: true,
    });

    if (result.docs.length === 0) {
      return null;
    }

    const doc = result.docs[0];

    return {
      status: (doc.status as string) ?? null,
      type: (doc.type as string) ?? null,
      nextRenewalDate: (doc.nextRenewalDate as string) ?? null,
      trialEndDate: (doc.trialEndDate as string) ?? null,
      trialActivatedAt: (doc.trialActivatedAt as string) ?? null,
    };
  } catch {
    // DB not available in dev — return null so the page renders with fallback
    return null;
  }
}
