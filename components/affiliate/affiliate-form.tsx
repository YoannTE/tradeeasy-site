"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function AffiliateForm() {
  const t = useTranslations("affiliate.form");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    // For now, just show success toast
    // In production, this would send to an API route or email
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success(t("successToast"));
    setSubmitting(false);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section id="apply" className="py-16">
      <div className="mx-auto max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900 p-6 md:p-10">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          {t("title")}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">{t("nameLabel")}</Label>
              <Input
                id="name"
                name="name"
                placeholder={t("namePlaceholder")}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t("emailLabel")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="platform">{t("platformLabel")}</Label>
              <Input
                id="platform"
                name="platform"
                placeholder={t("platformPlaceholder")}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="audience">{t("audienceLabel")}</Label>
              <Input
                id="audience"
                name="audience"
                placeholder={t("audiencePlaceholder")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="message">{t("messageLabel")}</Label>
            <Textarea
              id="message"
              name="message"
              placeholder={t("messagePlaceholder")}
              rows={4}
            />
          </div>

          <Button type="submit" disabled={submitting} className="w-full mt-2">
            {submitting ? t("submitting") : t("submit")}
          </Button>
        </form>
      </div>
    </section>
  );
}
