"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const stepKeys = ["step1", "step2", "step3", "step4"] as const;

export function CheckoutSuccessContent() {
  const t = useTranslations("checkout.success");

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
        <CheckCircle className="h-8 w-8 text-green-500" />
      </div>

      <h1 className="text-3xl font-bold text-zinc-50">{t("title")}</h1>
      <p className="mt-3 text-zinc-400">{t("subtitle")}</p>

      <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left">
        <h2 className="text-lg font-semibold text-zinc-50">
          {t("whatHappensNext")}
        </h2>
        <ol className="mt-4 space-y-3">
          {stepKeys.map((key, i) => (
            <li key={key} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-400">
                {i + 1}
              </span>
              <span className="text-sm text-zinc-300">{t(key)}</span>
            </li>
          ))}
        </ol>
      </div>

      <Button
        className="mt-8"
        size="lg"
        nativeButton={false}
        render={<Link href="/onboarding" />}
      >
        {t("cta")}
      </Button>

      <p className="mt-4 text-xs text-zinc-500">{t("note")}</p>
    </div>
  );
}
