import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { sendEmail } from "@/lib/email/send-email";
import { trialReminderEmail } from "@/lib/email/templates/trial-reminder";

/**
 * GET /api/cron/trial-reminder
 * Sends reminder emails to users whose trial ends in ~2 days.
 * Secured by CRON_SECRET (accepts all requests in dev if not set).
 */
export async function GET(request: Request) {
  // Verify cron secret
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const payload = await getPayload({ config });

    const now = new Date();
    const oneDayFromNow = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

    // Find trial subscriptions ending in ~2 days
    const subscriptions = await payload.find({
      collection: "subscriptions",
      overrideAccess: true,
      where: {
        status: { equals: "trial" },
        trialEndDate: {
          greater_than_equal: oneDayFromNow.toISOString(),
          less_than_equal: twoDaysFromNow.toISOString(),
        },
      },
      limit: 100,
      depth: 1,
    });

    const errors: string[] = [];
    let sent = 0;

    for (const sub of subscriptions.docs) {
      try {
        const user =
          typeof sub.user === "object" && sub.user !== null
            ? sub.user
            : await payload.findByID({
                collection: "users",
                id: typeof sub.user === "string" ? sub.user : sub.user.id,
                overrideAccess: true,
              });

        const trialEndDate = sub.trialEndDate
          ? new Date(sub.trialEndDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "soon";

        const planType = sub.type || "monthly";
        // Cron context has no cookies; default to "en"
        const emailData = trialReminderEmail(trialEndDate, planType, "en");
        await sendEmail({ to: user.email, ...emailData });
        sent++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(msg);
      }
    }

    return NextResponse.json({
      sent,
      total: subscriptions.docs.length,
      errors,
    });
  } catch {
    return NextResponse.json(
      { sent: 0, message: "No database connection or query failed" },
      { status: 200 },
    );
  }
}
