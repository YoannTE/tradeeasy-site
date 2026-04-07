"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { AuthCard } from "./auth-card";
import { FormField } from "./form-field";
import {
  createForgotPasswordSchema,
  type ForgotPasswordFormData,
} from "./forgot-password-schema";

export function ForgotPasswordForm() {
  const t = useTranslations("auth.forgotPassword");
  const tv = useTranslations("auth.validation");
  const [submitted, setSubmitted] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const schema = useMemo(
    () => createForgotPasswordSchema((key) => tv(key)),
    [tv],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setGlobalError(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setGlobalError(t("genericError"));
        return;
      }

      setSubmitted(true);
    } catch {
      setGlobalError(t("genericError"));
    }
  }

  if (submitted) {
    return (
      <AuthCard title={t("successTitle")} description="">
        <p className="mb-6 text-center text-sm text-zinc-400">
          {t("successMessage")}
        </p>
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToLogin")}
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard title={t("title")} description={t("description")}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {globalError && (
          <div className="rounded-lg border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-400">
            {globalError}
          </div>
        )}

        <FormField
          label={t("emailLabel")}
          type="email"
          placeholder={t("emailPlaceholder")}
          error={errors.email?.message}
          registration={register("email")}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              {t("submitting")}
            </>
          ) : (
            t("submitButton")
          )}
        </Button>

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToLogin")}
        </Link>
      </form>
    </AuthCard>
  );
}
