import type { CollectionAfterChangeHook } from "payload";
import { sendEmail } from "@/lib/email/send-email";
import { newSubscriberAdminEmail } from "@/lib/email/templates/new-subscriber-admin";

/**
 * afterChange hook for Users collection.
 * Sends a notification email to the admin when a new user is created.
 * Ignores the seed admin account (admin@admin.com).
 */
export const onNewUserCreated: CollectionAfterChangeHook = async ({
  doc,
  operation,
}) => {
  // Only trigger on creation
  if (operation !== "create") return doc;

  // Skip the seed admin
  if (doc.email === "admin@admin.com") return doc;

  const adminEmail = process.env.ADMIN_EMAIL || "admin@admin.com";
  const template = newSubscriberAdminEmail(
    doc.email,
    doc.tradingviewUsername || "",
  );

  await sendEmail({
    to: adminEmail,
    subject: template.subject,
    html: template.html,
  });

  return doc;
};
