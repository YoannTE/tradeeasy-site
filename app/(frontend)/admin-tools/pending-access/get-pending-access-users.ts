import type { Payload } from "payload";

export type PendingAccessUser = {
  id: number | string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  tradingviewUsername: string;
  createdAt: string;
  plan: string | null;
  subscriptionStatus: string | null;
};

/**
 * Fetch users who have paid but not yet received TradingView access.
 * A user is "pending access" when:
 *  - tradingviewAccessStatus === "pending"
 *  - AND they have at least one subscription with status in [trial, active]
 */
export async function getPendingAccessUsers(
  payload: Payload,
): Promise<PendingAccessUser[]> {
  const users = await payload.find({
    collection: "users",
    overrideAccess: true,
    where: { tradingviewAccessStatus: { equals: "pending" } },
    limit: 200,
    sort: "-createdAt",
  });

  const results: PendingAccessUser[] = [];

  for (const user of users.docs) {
    const subs = await payload.find({
      collection: "subscriptions",
      overrideAccess: true,
      where: {
        and: [
          { user: { equals: user.id } },
          { status: { in: ["trial", "active"] } },
        ],
      },
      limit: 1,
      sort: "-createdAt",
    });

    if (subs.docs.length === 0) continue;

    const sub = subs.docs[0];
    results.push({
      id: user.id,
      email: user.email,
      firstName: (user.firstName as string | undefined) ?? null,
      lastName: (user.lastName as string | undefined) ?? null,
      tradingviewUsername:
        (user.tradingviewUsername as string | undefined) ?? "",
      createdAt: user.createdAt,
      plan: (sub.type as string | undefined) ?? null,
      subscriptionStatus: (sub.status as string | undefined) ?? null,
    });
  }

  return results;
}
