import { CheckCircle, Bell } from "lucide-react";
import { getTranslations } from "next-intl/server";

const featureKeys = [
  "pushNotifications",
  "emailAlerts",
  "desktopAlerts",
  "webhookSupport",
  "multiTimeframe",
] as const;

export async function TradingViewSection() {
  const t = await getTranslations("tradingview");

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1 text-sm text-amber-400 mb-4">
              <Bell className="h-4 w-4" />
              Real-Time Alerts
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              {t("title")}
            </h2>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              {t("description")}
            </p>
            <ul className="mt-6 space-y-3">
              {featureKeys.map((key) => (
                <li key={key} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-zinc-300">{t(`features.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Visual */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <div className="space-y-4">
              <AlertMockup type="buy" pair="EUR/USD" time="2m ago" />
              <AlertMockup type="sell" pair="BTC/USDT" time="8m ago" />
              <AlertMockup type="buy" pair="NAS100" time="15m ago" />
              <AlertMockup type="sell" pair="Gold" time="22m ago" />
              <AlertMockup type="buy" pair="DAX 40" time="31m ago" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AlertMockup({
  type,
  pair,
  time,
}: {
  type: "buy" | "sell";
  pair: string;
  time: string;
}) {
  const isBuy = type === "buy";
  return (
    <div className="flex items-center gap-4 rounded-lg border border-zinc-700 bg-zinc-800 p-4">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          isBuy
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        <span className="text-lg font-bold">{isBuy ? "↑" : "↓"}</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">
          SimplifyPro —{" "}
          <span className={isBuy ? "text-green-400" : "text-red-400"}>
            {isBuy ? "BUY" : "SELL"}
          </span>{" "}
          Signal
        </p>
        <p className="text-xs text-zinc-400">
          {pair} · {time}
        </p>
      </div>
      <Bell className="h-4 w-4 text-zinc-500" />
    </div>
  );
}
