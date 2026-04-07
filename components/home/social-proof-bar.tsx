import { getTranslations } from "next-intl/server";

const platforms = [
  "BINANCE",
  "COINBASE",
  "KRAKEN",
  "METATRADER",
  "TRADINGVIEW",
];

export async function SocialProofBar() {
  const t = await getTranslations("socialProof");

  return (
    <section className="border-y border-zinc-800 bg-zinc-900/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm tracking-widest text-zinc-500">
          {t("trusted")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {platforms.map((name) => (
            <span key={name} className="text-lg font-bold text-zinc-600">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
