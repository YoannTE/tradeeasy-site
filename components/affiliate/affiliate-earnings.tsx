import { getTranslations } from "next-intl/server";

const tiers = [
  { referrals: 10, monthly: "$147", yearly: "$1,764" },
  { referrals: 25, monthly: "$368", yearly: "$4,410" },
  { referrals: 50, monthly: "$735", yearly: "$8,820" },
  { referrals: 100, monthly: "$1,470", yearly: "$17,640" },
];

export async function AffiliateEarnings() {
  const t = await getTranslations("affiliate.earnings");

  return (
    <section className="py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white">
        {t("title")}
      </h2>
      <p className="mt-2 text-center text-sm text-zinc-400">{t("subtitle")}</p>

      <div className="mt-10 mx-auto max-w-2xl overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-400">
                {t("referrals")}
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-zinc-400">
                {t("monthlyEarnings")}
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-zinc-400">
                {t("yearlyEarnings")}
              </th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier) => (
              <tr
                key={tier.referrals}
                className="border-b border-zinc-800 last:border-b-0"
              >
                <td className="px-6 py-4 text-sm text-white">
                  {tier.referrals}
                </td>
                <td className="px-6 py-4 text-right text-sm font-semibold text-emerald-400">
                  {tier.monthly}
                </td>
                <td className="px-6 py-4 text-right text-sm font-semibold text-emerald-400">
                  {tier.yearly}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-center text-xs text-zinc-500">
        Based on 30% commission on $49/mo monthly plans.
      </p>
    </section>
  );
}
