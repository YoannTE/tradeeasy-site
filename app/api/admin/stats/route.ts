import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { headers as getHeaders } from "next/headers";

const MONTHLY_PRICE = 49;
const ANNUAL_PRICE = 349;

/**
 * GET /api/admin/stats
 * Returns dashboard metrics for the admin panel.
 * Requires the caller to be an authenticated admin.
 */
export async function GET() {
  try {
    const payload = await getPayload({ config });

    // Verify admin authentication via Payload headers/cookies
    const headersList = await getHeaders();
    const user = await getAuthenticatedAdmin(payload, headersList);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const stats = await fetchStats(payload);
    return NextResponse.json({ data: stats });
  } catch (error) {
    console.error("[admin/stats] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * Authenticate the request and verify the user is an admin.
 */
async function getAuthenticatedAdmin(
  payload: Awaited<ReturnType<typeof getPayload>>,
  headersList: Awaited<ReturnType<typeof getHeaders>>,
) {
  try {
    const result = await payload.auth({ headers: headersList });

    if (!result.user || result.user.role !== "admin") {
      return null;
    }

    return result.user;
  } catch {
    return null;
  }
}

/**
 * Fetch all admin dashboard metrics from Payload.
 */
async function fetchStats(payload: Awaited<ReturnType<typeof getPayload>>) {
  const [trialSubs, activeMonthlySubs, activeAnnualSubs, pendingAccessUsers] =
    await Promise.all([
      payload.find({
        collection: "subscriptions",
        overrideAccess: true,
        where: { status: { equals: "trial" } },
        limit: 0,
      }),
      payload.find({
        collection: "subscriptions",
        overrideAccess: true,
        where: {
          and: [
            { type: { equals: "monthly" } },
            { status: { equals: "active" } },
          ],
        },
        limit: 0,
      }),
      payload.find({
        collection: "subscriptions",
        overrideAccess: true,
        where: {
          and: [
            { type: { equals: "annual" } },
            { status: { equals: "active" } },
          ],
        },
        limit: 0,
      }),
      payload.find({
        collection: "users",
        overrideAccess: true,
        where: { tradingviewAccessStatus: { equals: "pending" } },
        limit: 0,
      }),
    ]);

  const monthlyCount = activeMonthlySubs.totalDocs;
  const annualCount = activeAnnualSubs.totalDocs;
  const trialCount = trialSubs.totalDocs;
  const mrr =
    monthlyCount * MONTHLY_PRICE +
    (annualCount * Math.round((ANNUAL_PRICE / 12) * 100)) / 100;

  return {
    totalActiveSubscribers: monthlyCount + annualCount + trialCount,
    monthlySubscribers: monthlyCount,
    annualSubscribers: annualCount,
    trialSubscribers: trialCount,
    mrr: Math.round(mrr * 100) / 100,
    pendingAccess: pendingAccessUsers.totalDocs,
  };
}
