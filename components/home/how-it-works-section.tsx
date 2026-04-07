import { getTranslations } from "next-intl/server";

const stepKeys = ["step1", "step2", "step3"] as const;

export async function HowItWorksSection() {
  const t = await getTranslations("howItWorks");

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white">
          {t("title")}
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 bg-blue-500 rounded" />

        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stepKeys.map((key, index) => (
            <div key={key} className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl border border-zinc-700 text-xl md:text-2xl font-bold text-blue-400">
                {index + 1}
              </div>
              <h3 className="mt-4 text-base md:text-xl font-semibold text-white">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-1 text-sm md:text-base text-zinc-400 leading-relaxed max-w-xs">
                {t(`steps.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
