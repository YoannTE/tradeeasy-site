import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { sendEmail } from "@/lib/email/send-email";
import { escalationAdminEmail } from "@/lib/email/templates/escalation-admin";
import { trialReminderEmail } from "@/lib/email/templates/trial-reminder";

/**
 * GET /api/cron/daily-checks
 * Runs two checks:
 * 1. Escalation: users waiting >6h for TradingView access
 * 2. Trial reminders: trials ending in 1-2 days
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
    const adminEmail = process.env.ADMIN_EMAIL || "admin@admin.com";
    const errors: string[] = [];

    // --- Check 1: Escalation for pending access > 6h ---
    const escalations = await runEscalationCheck(payload, adminEmail, errors);

    // --- Check 2: Trial reminders (trials ending in 1-2 days) ---
    const trialReminders = await runTrialReminderCheck(payload, errors);

    // --- Check 3: Revoke TradingView access after 7-day grace period ---
    const revocations = await runGracePeriodRevoke(payload, errors);

    return NextResponse.json({
      escalations,
      trialReminders,
      revocations,
      errors,
    });
  } catch {
    return NextResponse.json(
      { escalations: 0, trialReminders: 0, message: "No database" },
      { status: 200 },
    );
  }
}

async function runEscalationCheck(
  payload: Awaited<ReturnType<typeof getPayload>>,
  adminEmail: string,
  errors: string[],
): Promise<number> {
  const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);

  const pendingUsers = await payload.find({
    collection: "users",
    overrideAccess: true,
    where: {
      tradingviewAccessStatus: { equals: "pending" },
      createdAt: { less_than: sixHoursAgo.toISOString() },
    },
    limit: 100,
  });

  let count = 0;
  for (const user of pendingUsers.docs) {
    try {
      const hoursWaiting =
        (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60);
      const tvUsername =
        ((user as Record<string, unknown>).tradingviewUsername as string) ||
        "unknown";
      const emailData = escalationAdminEmail(
        user.email,
        tvUsername,
        hoursWaiting,
      );
      await sendEmail({ to: adminEmail, ...emailData });
      count++;
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }
  return count;
}

async function runTrialReminderCheck(
  payload: Awaited<ReturnType<typeof getPayload>>,
  errors: string[],
): Promise<number> {
  const now = new Date();
  const oneDayFromNow = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
  const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

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

  let count = 0;
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
      const emailData = trialReminderEmail(trialEndDate, planType);
      await sendEmail({ to: user.email, ...emailData });
      count++;
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }
  return count;
}

/**
 * Revoke TradingView access for subscriptions in payment_failed state
 * for more than 7 days (grace period expired).
 */
async function runGracePeriodRevoke(
  payload: Awaited<ReturnType<typeof getPayload>>,
  errors: string[],
): Promise<number> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const expiredSubs = await payload.find({
    collection: "subscriptions",
    overrideAccess: true,
    where: {
      status: { equals: "payment_failed" },
      paymentFailedAt: { less_than: sevenDaysAgo.toISOString() },
    },
    limit: 100,
    depth: 1,
  });

  let count = 0;
  for (const sub of expiredSubs.docs) {
    try {
      const user =
        typeof sub.user === "object" && sub.user !== null
          ? sub.user
          : await payload.findByID({
              collection: "users",
              id: typeof sub.user === "string" ? sub.user : sub.user.id,
              overrideAccess: true,
            });

      if (
        (user as Record<string, unknown>).tradingviewAccessStatus === "granted"
      ) {
        await payload.update({
          collection: "users",
          id: user.id,
          overrideAccess: true,
          data: { tradingviewAccessStatus: "revoked" },
        });

        await payload.update({
          collection: "subscriptions",
          id: sub.id,
          overrideAccess: true,
          data: { status: "expired" },
        });

        count++;
      }
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }
  return count;
}
