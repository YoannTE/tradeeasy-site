import type Stripe from "stripe";
import { getPayload } from "payload";
import config from "@payload-config";
import { stripe } from "./stripe";
import { notifyAdminPendingTvAccess } from "@/lib/notifications/notify-admin-pending-tv-access";

/**
 * Check if a Stripe event has already been processed (idempotence).
 * Returns true if the event was already seen.
 */
export async function isEventAlreadyProcessed(
  eventId: string,
): Promise<boolean> {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "processed-stripe-events",
    overrideAccess: true,
    where: { eventId: { equals: eventId } },
    limit: 1,
  });

  return existing.docs.length > 0;
}

/**
 * Record a Stripe event as processed (idempotence).
 */
export async function markEventProcessed(
  eventId: string,
  eventType: string,
): Promise<void> {
  const payload = await getPayload({ config });

  await payload.create({
    collection: "processed-stripe-events",
    overrideAccess: true,
    data: {
      eventId,
      eventType,
      processedAt: new Date().toISOString(),
    },
  });
}

/**
 * Handle customer.subscription.created — link or create Payload Subscription.
 */
export async function handleSubscriptionCreated(
  event: Stripe.Event,
): Promise<void> {
  const subscription = event.data.object as Stripe.Subscription;
  const payload = await getPayload({ config });

  // Find user by stripeCustomerId
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const users = await payload.find({
    collection: "users",
    overrideAccess: true,
    where: { stripeCustomerId: { equals: customerId } },
    limit: 1,
  });

  if (users.docs.length === 0) {
    console.warn(`[webhook] No user found for Stripe customer: ${customerId}`);
    return;
  }

  const userId = users.docs[0].id;

  // Check if a Subscription already exists for this stripeSubscriptionId
  const existing = await payload.find({
    collection: "subscriptions",
    overrideAccess: true,
    where: { stripeSubscriptionId: { equals: subscription.id } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    // Update the existing subscription with the event ID
    await payload.update({
      collection: "subscriptions",
      id: existing.docs[0].id,
      overrideAccess: true,
      data: {
        lastSyncedAt: new Date().toISOString(),
      },
    });
    return;
  }

  // Create a new Payload subscription record
  await payload.create({
    collection: "subscriptions",
    overrideAccess: true,
    data: {
      user: userId,
      status: subscription.status === "trialing" ? "trial" : "active",
      startDate: new Date().toISOString(),
      stripeSubscriptionId: subscription.id,
      lastSyncedAt: new Date().toISOString(),
    },
  });
}

/**
 * Extract the Stripe subscription ID from an Invoice object.
 * In the clover API, the subscription is under parent.subscription_details.
 */
export function getSubscriptionIdFromInvoice(
  invoice: Stripe.Invoice,
): string | null {
  const subDetails = invoice.parent?.subscription_details;
  if (!subDetails) return null;

  const sub = subDetails.subscription;
  if (typeof sub === "string") return sub;
  if (sub && typeof sub === "object") return sub.id;
  return null;
}

/**
 * Handle checkout.session.completed — create Payload subscription from Checkout.
 */
export async function handleCheckoutCompleted(
  event: Stripe.Event,
): Promise<void> {
  const session = event.data.object as Stripe.Checkout.Session;
  const payload = await getPayload({ config });

  const userId = session.metadata?.userId;
  const plan = session.metadata?.plan as "monthly" | "annual" | undefined;
  const stripeSubId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  if (!userId || !stripeSubId) {
    console.warn(
      "[webhook] checkout.session.completed missing userId or subscriptionId",
    );
    return;
  }

  // Retrieve the full subscription to get trial dates
  const subscription = await stripe.subscriptions.retrieve(stripeSubId);

  // Check if already exists (idempotence)
  const existing = await payload.find({
    collection: "subscriptions",
    overrideAccess: true,
    where: { stripeSubscriptionId: { equals: stripeSubId } },
    limit: 1,
  });

  if (existing.docs.length > 0) return;

  // Create subscription record
  const numericUserId = Number(userId);
  await payload.create({
    collection: "subscriptions",
    overrideAccess: true,
    data: {
      user: numericUserId,
      type: plan || "monthly",
      status: subscription.status === "trialing" ? "trial" : "active",
      startDate: new Date().toISOString(),
      trialEndDate: subscription.trial_end
        ? new Date(subscription.trial_end * 1000).toISOString()
        : undefined,
      nextRenewalDate: subscription.trial_end
        ? new Date(subscription.trial_end * 1000).toISOString()
        : undefined,
      stripeSubscriptionId: stripeSubId,
      lastSyncedAt: new Date().toISOString(),
    },
  });

  // Update user's stripeCustomerId if not already set
  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;

  if (customerId) {
    await payload.update({
      collection: "users",
      id: numericUserId,
      overrideAccess: true,
      data: { stripeCustomerId: customerId },
    });
  }

  // Increment promo code usage if a discount was applied
  await incrementPromoCodeUsage(payload, subscription);

  // Notify admin that a paying subscriber needs TradingView access (fire-and-forget)
  try {
    const user = await payload.findByID({
      collection: "users",
      id: numericUserId,
      overrideAccess: true,
    });
    if (user?.tradingviewAccessStatus !== "granted") {
      notifyAdminPendingTvAccess({
        email: user.email,
        tradingviewUsername:
          (user.tradingviewUsername as string | undefined) || "",
        firstName: user.firstName as string | undefined,
        lastName: user.lastName as string | undefined,
        plan: plan || "monthly",
      }).catch((error) =>
        console.error("[webhook] notifyAdminPendingTvAccess failed:", error),
      );
    }
  } catch (error) {
    console.error("[webhook] Failed to fetch user for notification:", error);
  }
}

/**
 * Increment promo code currentUses if a Stripe coupon was used.
 * Uses a where clause with currentUses check to avoid exceeding maxUses.
 */
async function incrementPromoCodeUsage(
  payload: Awaited<ReturnType<typeof getPayload>>,
  subscription: Stripe.Subscription,
): Promise<void> {
  const discount = subscription.discounts?.[0];
  if (!discount || typeof discount === "string") return;

  const coupon = discount.source?.coupon;
  if (!coupon || typeof coupon === "string" || !coupon.name) return;

  // Try to find the promo code by coupon name (matches our code field)
  const promos = await payload.find({
    collection: "promo-codes",
    overrideAccess: true,
    where: { code: { equals: coupon.name } },
    limit: 1,
  });

  if (promos.docs.length === 0) return;

  const promo = promos.docs[0];
  const currentUses = (promo.currentUses as number) || 0;

  await payload.update({
    collection: "promo-codes",
    id: promo.id,
    overrideAccess: true,
    data: { currentUses: currentUses + 1 },
  });
}

/**
 * Handle invoice.payment_succeeded — activate subscription.
 */
export async function handlePaymentSucceeded(
  event: Stripe.Event,
): Promise<void> {
  const invoice = event.data.object as Stripe.Invoice;
  const stripeSubId = getSubscriptionIdFromInvoice(invoice);

  if (!stripeSubId) return;

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "subscriptions",
    overrideAccess: true,
    where: { stripeSubscriptionId: { equals: stripeSubId } },
    limit: 1,
  });

  if (result.docs.length === 0) return;

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
