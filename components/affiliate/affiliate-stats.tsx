import { getTranslations } from "next-intl/server";

export async function AffiliateStats() {
  const t = await getTranslations("affiliate.stats");

  const stats = [
    { value: t("commission"), label: t("commissionLabel") },
    { value: t("cookie"), label: t("cookieLabel") },
    { value: t("payout"), label: t("payoutLabel") },
    { value: t("frequency"), label: t("frequencyLabel") },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-center"
        >
          <p className="text-2xl md:text-3xl font-extrabold text-emerald-400">
            {stat.value}
          </p>
          <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
