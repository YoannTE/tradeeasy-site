import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { OnboardingStatus } from "@/components/onboarding/onboarding-status";
import { OnboardingChecklist } from "@/components/onboarding/onboarding-checklist";
import { OnboardingVideo } from "@/components/onboarding/onboarding-video";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.onboarding");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function OnboardingPage() {
  const user = await requireAuth();
  const t = await getTranslations("onboarding");

  const accessStatus =
    (user.tradingviewAccessStatus as string | undefined) ?? "pending";

  if (accessStatus === "granted") {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-zinc-50">{t("title")}</h1>
        <p className="text-zinc-400">{t("subtitle")}</p>
      </div>

      <div className="mt-8 space-y-8">
        <OnboardingStatus status={accessStatus} />
        <OnboardingChecklist />
        <OnboardingVideo />
      </div>
    </div>
  );
}
