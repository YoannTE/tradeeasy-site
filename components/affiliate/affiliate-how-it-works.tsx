import { getTranslations } from "next-intl/server";
import { UserPlus, Share2, DollarSign } from "lucide-react";

const steps = [
  { key: "step1", icon: UserPlus },
  { key: "step2", icon: Share2 },
  { key: "step3", icon: DollarSign },
] as const;

export async function AffiliateHowItWorks() {
  const t = await getTranslations("affiliate.howItWorks");

  return (
    <section className="py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
        {t("title")}
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map(({ key, icon: Icon }, index) => (
          <div
            key={key}
            className="relative rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
              <Icon className="h-6 w-6 text-emerald-400" />
            </div>
            <span className="absolute left-4 top-4 text-xs font-bold text-zinc-600">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-semibold text-white">
              {t(`${key}.title`)}
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              {t(`${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
