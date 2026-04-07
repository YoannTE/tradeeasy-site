import { getTranslations } from "next-intl/server";
import { ShieldCheck } from "lucide-react";

export async function GuaranteeBadge() {
  const t = await getTranslations("pricing.guarantee");

  return (
    <div className="mx-auto mt-10 flex max-w-xl items-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-4">
      <ShieldCheck className="h-8 w-8 shrink-0 text-emerald-400" />
      <div>
        <p className="font-semibold text-emerald-400">{t("text")}</p>
        <p className="mt-0.5 text-sm text-zinc-400">{t("subtext")}</p>
      </div>
    </div>
  );
}
