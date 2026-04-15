import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { PricingFeatureList } from "./pricing-feature-list";

const featureKeys = [
  "indicator",
  "allMarkets",
  "allTimeframes",
  "signals",
  "tutorials",
  "emailSupport",
] as const;

export async function PricingCardMonthly() {
  const t = await getTranslations("pricing");

  const features = featureKeys.map((key) => ({
    label: t(`features.${key}`),
  }));

  return (
    <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:p-8">
      <span className="absolute right-4 top-4 rounded-full bg-red-500/15 px-4 py-1.5 text-base md:text-lg font-bold text-red-400 ring-1 ring-red-500/40">
        {t("monthly.discountBadge")}
      </span>

      <h3 className="text-xl font-bold text-white">{t("monthly.name")}</h3>

      <div className="mt-4 flex items-baseline gap-3 flex-wrap">
        <span className="text-2xl md:text-3xl font-semibold text-zinc-500 line-through">
          {t("monthly.originalPrice")}
        </span>
        <span className="text-3xl md:text-5xl font-extrabold text-white">
          {t("monthly.price")}
        </span>
        <span className="text-lg text-zinc-400">{t("monthly.period")}</span>
      </div>

      <p className="mt-1 text-xs text-zinc-500">{t("monthly.billing")}</p>

      <div className="my-6 border-t border-zinc-800" />

      <PricingFeatureList features={features} />

      <Button
        variant="outline"
        className="mt-8 w-full"
        nativeButton={false}
        render={<Link href="/signup?plan=monthly" />}
      >
        {t("monthly.cta")}
      </Button>

      <p className="mt-3 text-center text-xs text-zinc-500">
        {t("monthly.note")}
      </p>
    </div>
  );
}
