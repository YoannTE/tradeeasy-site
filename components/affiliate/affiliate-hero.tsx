import { getTranslations } from "next-intl/server";

export async function AffiliateHero() {
  const t = await getTranslations("affiliate.hero");

  return (
    <section className="py-16 md:py-24 text-center">
      <span className="inline-block rounded-full bg-emerald-500/10 px-4 py-1 text-sm text-emerald-400 mb-6">
        {t("badge")}
      </span>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
        {t("title")}
      </h1>
      <p className="mt-4 text-sm md:text-lg text-zinc-400 max-w-2xl mx-auto">
        {t("subtitle")}
      </p>
      <a
        href="#apply"
        className="mt-8 inline-block rounded-lg bg-emerald-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
      >
        {t("cta")}
      </a>
    </section>
  );
}
