import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

const monthlyFeatureKeys = [
  "fullAccess",
  "mobileAlerts",
  "trainingGuide",
] as const;

const annualFeatureKeys = [
  "fullAccess",
  "mobileAlerts",
  "trainingGuide",
  "prioritySupport",
] as const;

export async function PricingPreviewSection() {
  const t = await getTranslations("pricingPreview");

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm md:text-base text-center text-zinc-400">
          {t("subtitle")}
        </p>

        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Monthly Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:p-8">
            <h3 className="text-xl font-semibold text-white">
              {t("monthly.name")}
            </h3>
            <div className="mt-4">
              <span className="text-3xl md:text-4xl font-extrabold text-white">
                {t("monthly.price")}
              </span>
              <span className="text-zinc-400">{t("monthly.period")}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {monthlyFeatureKeys.map((key) => (
                <li key={key} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-zinc-300">{t(`features.${key}`)}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="mt-8 w-full py-3"
              nativeButton={false}
              render={<Link href="/pricing" />}
            >
              {t("monthly.cta")}
            </Button>
          </div>

          {/* Annual Card */}
          <div className="relative rounded-2xl border border-blue-500 bg-zinc-900 p-5 md:p-8 shadow-lg shadow-blue-500/10">
            <span className="absolute -top-3 right-6 rotate-12 rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
              {t("annual.badge")}
            </span>
            <h3 className="text-xl font-semibold text-white">
              {t("annual.name")}
            </h3>
            <div className="mt-4">
              <span className="text-3xl md:text-4xl font-extrabold text-white">
                {t("annual.price")}
              </span>
              <span className="text-zinc-400">{t("annual.period")}</span>
            </div>
            <p className="mt-1 text-sm text-blue-400">{t("annual.save")}</p>
            <ul className="mt-6 space-y-3">
              {annualFeatureKeys.map((key) => (
                <li key={key} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-zinc-300">{t(`features.${key}`)}</span>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                <span className="font-bold text-white">
                  {t("annual.bonus")}
                </span>
              </li>
            </ul>
            <Button
              className="mt-8 w-full py-3"
              nativeButton={false}
              render={<Link href="/pricing" />}
            >
              {t("annual.cta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
