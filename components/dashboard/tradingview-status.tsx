import { getTranslations } from "next-intl/server";

interface TradingviewStatusProps {
  accessStatus: string;
  username: string;
}

export async function TradingviewStatus({
  accessStatus,
  username,
}: TradingviewStatusProps) {
  const t = await getTranslations("dashboard.tradingview");

  const statusConfig: Record<string, { label: string; classes: string }> = {
    pending: {
      label: t("status.pending"),
      classes: "bg-amber-500/10 text-amber-400",
    },
    granted: {
      label: t("status.granted"),
      classes: "bg-green-500/10 text-green-400",
    },
    revoked: {
      label: t("status.revoked"),
      classes: "bg-red-500/10 text-red-400",
    },
  };

  const badge = statusConfig[accessStatus] ?? statusConfig.pending;
  const message = t(`messages.${accessStatus}`) ?? t("messages.pending");

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
          {t("username")} <span className="text-zinc-200">{username}</span>
        </p>
        <p className="text-sm text-zinc-400">{message}</p>
      </div>
    </div>
  );
}
