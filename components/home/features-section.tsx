import { Shield, Bell, Target, Globe, CheckCircle, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

const featureKeys = [
  { key: "liveSignals" as const, icon: Shield },
  { key: "realTimeAlerts" as const, icon: Bell },
  { key: "clearSignals" as const, icon: Target },
  { key: "anyMarket" as const, icon: Globe },
  { key: "noExperience" as const, icon: CheckCircle },
  { key: "affiliateProgram" as const, icon: Users },
];

export async function FeaturesSection() {
  const t = await getTranslations("features");

  return (
    <section id="features" className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white">
          {t("title")}
        </h2>
        <p className="mt-4 text-center text-zinc-400 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featureKeys.map((feature, index) => (
            <div
              key={feature.key}
              className="rounded-xl border border-blue-500/40 bg-zinc-900 p-6 shadow-lg shadow-blue-500/5"
            >
              <div className="inline-flex rounded-lg bg-blue-500/20 p-2 text-blue-400">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-base md:text-xl font-semibold text-white">
                {t(`${feature.key}.title`)}
              </h3>
              <p className="mt-1 text-sm md:text-base text-zinc-400 leading-relaxed">
                {t(`${feature.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
