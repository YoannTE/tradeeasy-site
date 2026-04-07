import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Create a trial subscription record in Payload for the given user.
 */
export async function createTrialSubscription(
  userId: string,
  stripeSubscriptionId?: string,
): Promise<void> {
  const payload = await getPayload({ config });

  await payload.create({
    collection: "subscriptions",
    overrideAccess: true,
    data: {
      user: userId,
      status: "trial",
      startDate: new Date().toISOString(),
      ...(stripeSubscriptionId ? { stripeSubscriptionId } : {}),
    },
  });
}

/**
 * Activate a subscription by its Stripe subscription ID.
 */
export async function activateSubscription(
  stripeSubscriptionId: string,
): Promise<void> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "subscriptions",
    overrideAccess: true,
    where: { stripeSubscriptionId: { equals: stripeSubscriptionId } },
    limit: 1,
  });

  if (result.docs.length === 0) {
    console.warn(
      `[subscription-logic] No subscription found for Stripe ID: ${stripeSubscriptionId}`,
    );
    return;
  }

  await payload.update({
    collection: "subscriptions",
    id: result.docs[0].id,
    overrideAccess: true,
    data: {
      status: "active",
      lastSyncedAt: new Date().toISOString(),
    },
  });
}

/**
 * Mark a subscription as payment_failed.
 */
export async function handlePaymentFailed(
  stripeSubscriptionId: string,
): Promise<void> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "subscriptions",
    overrideAccess: true,
    where: { stripeSubscriptionId: { equals: stripeSubscriptionId } },
    limit: 1,
  });

  if (result.docs.length === 0) return;

  await payload.update({
    collection: "subscriptions",
    id: result.docs[0].id,
    overrideAccess: true,
    data: {
      status: "payment_failed",
      lastSyncedAt: new Date().toISOString(),
    },
  });
}

/**
 * Cancel a subscription by its Stripe subscription ID.
 */
export async function cancelSubscription(
  stripeSubscriptionId: string,
): Promise<void> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "subscriptions",
    overrideAccess: true,
    where: { stripeSubscriptionId: { equals: stripeSubscriptionId } },
    limit: 1,
  });

  if (result.docs.length === 0) return;

  await payload.update({
    collection: "subscriptions",
    id: result.docs[0].id,
    overrideAccess: true,
    data: {
      status: "cancelled",
      lastSyncedAt: new Date().toISOString(),
    },
  });
}

/**
 * Check whether a user has an active or trial subscription.
 */
export async function isSubscriptionActive(userId: string): Promise<boolean> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "subscriptions",
    overrideAccess: true,
    where: {
      and: [
        { user: { equals: userId } },
        { status: { in: ["trial", "active"] } },
      ],
    },
    limit: 1,
  });

  return result.docs.length > 0;
}
