import type Stripe from "stripe";
import { getPayload } from "payload";
import config from "@payload-config";
import { getSubscriptionIdFromInvoice } from "./webhook-handlers";
import { sendEmail } from "@/lib/email/send-email";
import { paymentFailedEmail } from "@/lib/email/templates/payment-failed";

/**
 * Handle invoice.payment_failed — mark subscription as payment_failed.
 */
export async function handlePaymentFailed(event: Stripe.Event): Promise<void> {
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
      status: "payment_failed",
      stripeEventId: event.id,
      lastSyncedAt: new Date().toISOString(),
    },
  });

  // Send payment failed email to the user (fire-and-forget)
  const sub = result.docs[0];
  const userId = typeof sub.user === "string" ? sub.user : sub.user.id;
  const user = await payload.findByID({
    collection: "users",
    id: userId,
    overrideAccess: true,
  });
  // Webhook context has no cookies; default to "en"
  const emailData = paymentFailedEmail("en");
  sendEmail({ to: user.email, ...emailData }).catch(console.error);
}

/**
 * Handle customer.subscription.updated — sync status changes.
 */
export async function handleSubscriptionUpdated(
  event: Stripe.Event,
): Promise<void> {
  const subscription = event.data.object as Stripe.Subscription;
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "subscriptions",
    overrideAccess: true,
    where: { stripeSubscriptionId: { equals: subscription.id } },
    limit: 1,
  });

  if (result.docs.length === 0) return;

  // Map Stripe status to our internal status
  const statusMap: Record<string, string> = {
    trialing: "trial",
    active: "active",
    past_due: "payment_failed",
    canceled: "cancelled",
    unpaid: "payment_failed",
  };

  const newStatus = statusMap[subscription.status] || "active";

  await payload.update({
    collection: "subscriptions",
    id: result.docs[0].id,
    overrideAccess: true,
    data: {
      status: newStatus,
      stripeEventId: event.id,
      lastSyncedAt: new Date().toISOString(),
    },
  });
}

/**
 * Handle customer.subscription.deleted — cancel subscription.
 */
export async function handleSubscriptionDeleted(
  event: Stripe.Event,
): Promise<void> {
  const subscription = event.data.object as Stripe.Subscription;
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "subscriptions",
    overrideAccess: true,
    where: { stripeSubscriptionId: { equals: subscription.id } },
    limit: 1,
  });

  if (result.docs.length === 0) return;

  await payload.update({
    collection: "subscriptions",
    id: result.docs[0].id,
    overrideAccess: true,
    data: {
      status: "cancelled",
      stripeEventId: event.id,
      lastSyncedAt: new Date().toISOString(),
    },
  });
}
