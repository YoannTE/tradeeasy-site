import type { CollectionAfterChangeHook } from "payload";
import { sendEmail } from "@/lib/email/send-email";
import { accessGrantedEmail } from "@/lib/email/templates/access-granted";
import { stripe, isStripeConfigured } from "@/lib/stripe/stripe";

/**
 * afterChange hook for Users collection.
 * Detects when tradingviewAccessStatus transitions to "granted" and:
 * 1. Sets tradingviewAccessGrantedAt on the user
 * 2. Activates the trial on the user's subscription (trialActivatedAt)
 * 3. Sends an "access granted" email to the user
 */
export const onTradingviewAccessGranted: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  // Only trigger on updates, not on create
  if (operation !== "update") return doc;

  const wasNotGranted = previousDoc?.tradingviewAccessStatus !== "granted";
  const isNowGranted = doc.tradingviewAccessStatus === "granted";

  if (!wasNotGranted || !isNowGranted) return doc;

  const now = new Date().toISOString();

  // 1. Set tradingviewAccessGrantedAt if not already set in this save
  if (!doc.tradingviewAccessGrantedAt) {
    await req.payload.update({
      collection: "users",
      id: doc.id,
      overrideAccess: true,
      data: { tradingviewAccessGrantedAt: now },
    });
  }

  // 2. Activate trial on the user's subscription
  await activateTrialForUser(req.payload, doc.id, now);

  // 3. Send "access granted" email to the user
  // Hooks run server-side without cookie context; default to "en"
  const template = accessGrantedEmail(doc.tradingviewUsername || "", "en");
  await sendEmail({
    to: doc.email,
    subject: template.subject,
    html: template.html,
  });

  return doc;
};

/**
 * Find the user's trial subscription, set trialActivatedAt,
 * and align the Stripe trial_end to activation_date + 7 days.
 */
async function activateTrialForUser(
  payload: Parameters<CollectionAfterChangeHook>[0]["req"]["payload"],
  userId: string | number,
  activatedAt: string,
): Promise<void> {
  const result = await payload.find({
    collection: "subscriptions",
    overrideAccess: true,
    where: {
      and: [{ user: { equals: userId } }, { status: { equals: "trial" } }],
    },
    limit: 1,
  });

  if (result.docs.length === 0) return;

  const sub = result.docs[0];

  // Calculate the real trial end: activation + 7 days
  const TRIAL_DAYS = 7;
  const trialEnd = new Date(activatedAt);
  trialEnd.setDate(trialEnd.getDate() + TRIAL_DAYS);
  const trialEndISO = trialEnd.toISOString();
  const trialEndUnix = Math.floor(trialEnd.getTime() / 1000);

  // Update Stripe subscription trial_end to align with activation
  if (isStripeConfigured() && sub.stripeSubscriptionId) {
    try {
      await stripe.subscriptions.update(sub.stripeSubscriptionId, {
        trial_end: trialEndUnix,
      });
    } catch (error) {
      console.error("[hook] Failed to update Stripe trial_end:", error);
    }
  }

  // Update Payload subscription with activation date and aligned trial end
  await payload.update({
    collection: "subscriptions",
    id: sub.id,
    overrideAccess: true,
    data: {
      trialActivatedAt: activatedAt,
      trialEndDate: trialEndISO,
      nextRenewalDate: trialEndISO,
    },
  });
}
