import { getPayload } from "payload";
import config from "@payload-config";

export interface DashboardStats {
  totalUsers: number;
  activeSubscribers: number;
  trialSubscribers: number;
  paymentFailedCount: number;
  newUsersLast30Days: number;
  recentUsers: Array<{
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    createdAt: string;
  }>;
}

export async function loadDashboardStats(): Promise<DashboardStats> {
  const payload = await getPayload({ config });
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [totalUsers, active, trial, paymentFailed, recent, last30Days] =
    await Promise.all([
      payload.count({ collection: "users" }),
      payload.count({
        collection: "subscriptions",
        where: { status: { equals: "active" } },
      }),
      payload.count({
        collection: "subscriptions",
        where: { status: { equals: "trial" } },
      }),
      payload.count({
        collection: "subscriptions",
        where: { status: { equals: "payment_failed" } },
      }),
      payload.find({
        collection: "users",
        limit: 5,
        sort: "-createdAt",
        depth: 0,
      }),
      payload.count({
        collection: "users",
        where: { createdAt: { greater_than: thirtyDaysAgo.toISOString() } },
      }),
    ]);

  return {
    totalUsers: totalUsers.totalDocs,
    activeSubscribers: active.totalDocs,
    trialSubscribers: trial.totalDocs,
    paymentFailedCount: paymentFailed.totalDocs,
    newUsersLast30Days: last30Days.totalDocs,
    recentUsers: recent.docs.map((doc) => ({
      id: String(doc.id),
      email: doc.email as string,
      firstName: (doc as { firstName?: string | null }).firstName ?? null,
      lastName: (doc as { lastName?: string | null }).lastName ?? null,
      createdAt: doc.createdAt as string,
    })),
  };
}
