import { CheckCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

const featureKeys = [
  "pushNotifications",
  "webhookSupport",
  "multiTimeframe",
] as const;

export async function TradingViewSection() {
  const t = await getTranslations("tradingview");

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <h2 className="text-3xl font-bold text-white">{t("title")}</h2>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              {t("description")}
            </p>
            <ul className="mt-6 space-y-3">
              {featureKeys.map((key) => (
                <li key={key} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500 shrink-0" />
                  <span className="text-zinc-300">{t(`features.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Image placeholder */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 h-[350px] flex items-center justify-center">
            <span className="text-zinc-600 text-lg">{t("preview")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
