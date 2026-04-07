import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function CtaSection() {
  const t = await getTranslations("cta");

  return (
    <section className="my-12 md:my-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 md:p-16 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            {t("title")}
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <Button
            size="lg"
            className="mt-6 px-6 py-3 md:mt-8 md:px-8 md:py-4 text-sm md:text-lg"
            nativeButton={false}
            render={<Link href="/pricing" />}
          >
            {t("button")}
          </Button>
          <p className="mt-4 text-sm text-zinc-500">{t("noCard")}</p>
        </div>
      </div>
    </section>
  );
}
