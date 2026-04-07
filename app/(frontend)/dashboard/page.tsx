import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { getLatestSubscription } from "@/lib/subscriptions/get-latest-subscription";
import { SubscriptionCard } from "@/components/dashboard/subscription-card";
import { TradingviewStatus } from "@/components/dashboard/tradingview-status";
import { DashboardLinks } from "@/components/dashboard/dashboard-links";
import { DashboardActions } from "@/components/dashboard/dashboard-actions";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.dashboard");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function DashboardPage() {
  const user = await requireAuth();
  const subscription = await getLatestSubscription(user.id);
  const t = await getTranslations("dashboard");

  const accessStatus =
    (user.tradingviewAccessStatus as string | undefined) ?? "pending";
  const tvUsername =
    (user.tradingviewUsername as string | undefined) ?? "Unknown";

  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <h1 className="text-3xl font-bold text-zinc-50">{t("title")}</h1>
      <p className="mt-2 text-zinc-400">{t("subtitle")}</p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <SubscriptionCard subscription={subscription} />
        <TradingviewStatus accessStatus={accessStatus} username={tvUsername} />
      </div>

      <div className="mt-8">
        <DashboardLinks />
      </div>

      <div className="mt-8">
        <DashboardActions />
      </div>
    </div>
  );
}
