import { getTranslations } from "next-intl/server";
import {
  RefreshCw,
  Clock,
  BarChart3,
  HeadphonesIcon,
  Infinity,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  { key: "recurring", icon: RefreshCw },
  { key: "cookie", icon: Clock },
  { key: "dashboard", icon: BarChart3 },
  { key: "support", icon: HeadphonesIcon },
  { key: "noLimit", icon: Infinity },
  { key: "trusted", icon: ShieldCheck },
] as const;

export async function AffiliateBenefits() {
  const t = await getTranslations("affiliate.benefits");

  return (
    <section className="py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
        {t("title")}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map(({ key, icon: Icon }) => (
          <div
            key={key}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <Icon className="h-6 w-6 text-emerald-400 mb-3" />
            <h3 className="text-base font-semibold text-white">
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
