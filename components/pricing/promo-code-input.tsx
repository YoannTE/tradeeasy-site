"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PromoCodeInput() {
  const t = useTranslations("pricing.promo");
  const [code, setCode] = useState("");

  function handleApply() {
    toast.info(t("toast"));
  }

  return (
    <div className="mx-auto mt-8 max-w-md text-center">
      <p className="mb-2 text-sm text-zinc-400">{t("label")}</p>
      <div className="flex gap-2">
        <Input
          placeholder={t("placeholder")}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
        />
        <Button variant="outline" onClick={handleApply}>
          {t("apply")}
        </Button>
      </div>
    </div>
  );
}
