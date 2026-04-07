import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface SubscriptionData {
  status?: string | null;
  type?: string | null;
  nextRenewalDate?: string | null;
  trialEndDate?: string | null;
  trialActivatedAt?: string | null;
}

interface SubscriptionCardProps {
  subscription: SubscriptionData | null;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getTrialDaysRemaining(trialEndDate: string): number {
  const end = new Date(trialEndDate).getTime();
  const now = Date.now();
  return Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
}

export async function SubscriptionCard({
  subscription,
}: SubscriptionCardProps) {
  const t = await getTranslations("dashboard.subscription");

  const statusConfig: Record<string, { label: string; classes: string }> = {
    trial: {
      label: t("status.trial"),
      classes: "bg-amber-500/10 text-amber-400",
    },
    active: {
      label: t("status.active"),
      classes: "bg-green-500/10 text-green-400",
    },
    payment_failed: {
      label: t("status.paymentFailed"),
      classes: "bg-red-500/10 text-red-400",
    },
    cancelled: {
      label: t("status.cancelled"),
      classes: "bg-zinc-500/10 text-zinc-400",
    },
    expired: {
      label: t("status.expired"),
      classes: "bg-zinc-500/10 text-zinc-400",
    },
  };

  if (!subscription) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-lg font-semibold text-zinc-50">{t("title")}</h2>
        <p className="mt-3 text-sm text-zinc-400">{t("noSubscription")}</p>
        <Link
          href="/pricing"
          className="mt-4 inline-block text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          {t("viewPlans")}
        </Link>
      </div>
    );
  }

  const status = subscription.status ?? "active";
  const badge = statusConfig[status] ?? statusConfig.active;
  const planLabel = subscription.type === "annual" ? t("annual") : t("monthly");

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-50">{t("title")}</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${badge.classes}`}
        >
          {badge.label}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-sm text-zinc-400">
          {t("planLabel")} <span className="text-zinc-200">{planLabel}</span>
        </p>

        {status === "trial" && subscription.trialEndDate && (
          <>
            <p className="text-sm text-zinc-400">
              {t("trialEnds")}{" "}
              <span className="text-zinc-200">
                {formatDate(subscription.trialEndDate)}
              </span>
            </p>
            <p className="text-sm font-medium text-amber-400">
              {t("daysRemaining", {
                count: getTrialDaysRemaining(subscription.trialEndDate),
              })}
            </p>
          </>
        )}

        {status !== "trial" && subscription.nextRenewalDate && (
          <p className="text-sm text-zinc-400">
            {t("nextRenewal")}{" "}
            <span className="text-zinc-200">
              {formatDate(subscription.nextRenewalDate)}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
