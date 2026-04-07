import { PlayCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function OnboardingVideo() {
  const t = await getTranslations("onboarding.video");

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-zinc-50">{t("title")}</h2>

      <div className="flex h-[300px] items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
        <div className="flex flex-col items-center gap-3 text-zinc-500">
          <PlayCircle className="h-16 w-16" />
          <p className="text-sm">{t("placeholder")}</p>
        </div>
      </div>
    </div>
  );
}
