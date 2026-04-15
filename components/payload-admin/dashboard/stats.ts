import { getPayload } from "payload";
import config from "@payload-config";

export interface PipelineStat {
  label: string;
  value: number;
  tone: "neutral" | "info" | "success" | "warning" | "danger";
}

export interface AlertItem {
  id: string;
  title: string;
  detail: string;
  href: string;
  severity: "info" | "warning" | "danger" | "success";
  cta: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeSubscribers: number;
  trialSubscribers: number;
  paymentFailedCount: number;
  cancelledCount: number;
  newUsersLast7Days: number;
  newUsersLast30Days: number;
  pendingTradingviewAccess: number;
  estimatedMonthlyRevenueCents: number;
  pipeline: PipelineStat[];
  alerts: AlertItem[];
}

const MONTHLY_PRICE_EUR_CENTS = 2450;

export async function loadDashboardStats(): Promise<DashboardStats> {
  const payload = await getPayload({ config });
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    active,
    trial,
    paymentFailed,
    cancelled,
    last7Days,
    last30Days,
    pendingAccess,
    trialsEndingSoon,
    failedSubsSample,
  ] = await Promise.all([
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
    payload.count({
      collection: "subscriptions",
      where: { status: { equals: "cancelled" } },
    }),
    payload.count({
      collection: "users",
      where: { createdAt: { greater_than: sevenDaysAgo.toISOString() } },
    }),
    payload.count({
      collection: "users",
      where: { createdAt: { greater_than: thirtyDaysAgo.toISOString() } },
    }),
    payload.count({
      collection: "users",
      where: { tradingviewAccessStatus: { equals: "pending" } },
    }),
    payload.find({
      collection: "subscriptions",
      where: {
        and: [
          { status: { equals: "trial" } },
          { trialEndDate: { less_than: sevenDaysFromNow.toISOString() } },
          { trialEndDate: { greater_than: now.toISOString() } },
        ],
      },
      limit: 3,
      depth: 1,
      sort: "trialEndDate",
    }),
    payload.find({
      collection: "subscriptions",
      where: { status: { equals: "payment_failed" } },
      limit: 3,
      depth: 1,
      sort: "-paymentFailedAt",
    }),
  ]);

  const alerts: AlertItem[] = [];

  for (const sub of failedSubsSample.docs) {
    const user = typeof sub.user === "object" ? sub.user : null;
    const email = user?.email ?? "Abonné";
    alerts.push({
      id: `failed-${sub.id}`,
      title: email,
      detail: "Paiement en échec — à relancer",
      href: `/admin/collections/subscriptions/${sub.id}`,
      severity: "danger",
      cta: "Voir",
    });
  }

  for (const sub of trialsEndingSoon.docs) {
    const user = typeof sub.user === "object" ? sub.user : null;
    const email = user?.email ?? "Abonné";
    const endDate = sub.trialEndDate
      ? new Date(sub.trialEndDate as string)
      : null;
    const daysLeft = endDate
      ? Math.max(
          0,
          Math.ceil(
            (endDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000),
          ),
        )
      : null;
    alerts.push({
      id: `trial-${sub.id}`,
      title: email,
      detail:
        daysLeft !== null
          ? `Essai se termine dans ${daysLeft} jour${daysLeft > 1 ? "s" : ""}`
          : "Essai se termine bientôt",
      href: `/admin/collections/subscriptions/${sub.id}`,
      severity: "warning",
      cta: "Relancer",
    });
  }

  if (pendingAccess.totalDocs > 0) {
    alerts.push({
      id: "pending-tv",
      title: `${pendingAccess.totalDocs} accès TradingView en attente`,
      detail: "À accorder manuellement dans TradingView",
      href: "/admin/collections/users?tradingviewAccessStatus=pending",
      severity: "info",
      cta: "Traiter",
    });
  }

  const pipeline: PipelineStat[] = [
    {
      label: "Total inscrits",
      value: totalUsers.totalDocs,
      tone: "neutral",
    },
    {
      label: "Essai en cours",
      value: trial.totalDocs,
      tone: "info",
    },
    {
      label: "Abonnés payants",
      value: active.totalDocs,
      tone: "success",
    },
    {
      label: "Paiement échoué",
      value: paymentFailed.totalDocs,
      tone: paymentFailed.totalDocs > 0 ? "danger" : "neutral",
    },
    {
      label: "Annulés",
      value: cancelled.totalDocs,
      tone: "warning",
    },
  ];

  return {
    totalUsers: totalUsers.totalDocs,
    activeSubscribers: active.totalDocs,
    trialSubscribers: trial.totalDocs,
    paymentFailedCount: paymentFailed.totalDocs,
    cancelledCount: cancelled.totalDocs,
    newUsersLast7Days: last7Days.totalDocs,
    newUsersLast30Days: last30Days.totalDocs,
    pendingTradingviewAccess: pendingAccess.totalDocs,
    estimatedMonthlyRevenueCents: active.totalDocs * MONTHLY_PRICE_EUR_CENTS,
    pipeline,
    alerts,
  };
}
