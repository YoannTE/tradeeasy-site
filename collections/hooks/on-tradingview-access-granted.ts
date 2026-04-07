import type { CollectionAfterChangeHook } from "payload";
import { sendEmail } from "@/lib/email/send-email";
import { accessGrantedEmail } from "@/lib/email/templates/access-granted";

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
 * Find the user's trial subscription and set trialActivatedAt.
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

  await payload.update({
    collection: "subscriptions",
    id: result.docs[0].id,
    overrideAccess: true,
    data: { trialActivatedAt: activatedAt },
  });
}
