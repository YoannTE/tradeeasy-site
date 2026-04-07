import type Stripe from "stripe";
import { getPayload } from "payload";
import config from "@payload-config";
import { stripe } from "./stripe";

/**
 * Check if a Stripe event has already been processed (idempotence).
 * Returns true if the event was already seen.
 */
export async function isEventAlreadyProcessed(
  eventId: string,
): Promise<boolean> {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "subscriptions",
    overrideAccess: true,
    where: { stripeEventId: { equals: eventId } },
    limit: 1,
  });

  return existing.docs.length > 0;
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
        stripeEventId: event.id,
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
      stripeEventId: event.id,
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
      stripeEventId: event.id,
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
      stripeEventId: event.id,
      lastSyncedAt: new Date().toISOString(),
    },
  });
}
