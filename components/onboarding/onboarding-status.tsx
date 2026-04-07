import { getTranslations } from "next-intl/server";

interface OnboardingStatusProps {
  status: string;
}

export async function OnboardingStatus({ status }: OnboardingStatusProps) {
  const t = await getTranslations("onboarding.status");
  const isGranted = status === "granted";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span
          className={
            isGranted
              ? "rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400"
              : "rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-400"
          }
        >
          {isGranted ? t("granted") : t("pending")}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-zinc-400">
        {isGranted ? t("grantedMessage") : t("pendingMessage")}
      </p>
    </div>
  );
}
