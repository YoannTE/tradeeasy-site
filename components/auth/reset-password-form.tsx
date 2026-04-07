"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { AuthCard } from "./auth-card";
import { FormField } from "./form-field";
import {
  createResetPasswordSchema,
  type ResetPasswordFormData,
} from "./reset-password-schema";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const t = useTranslations("auth.resetPassword");
  const tv = useTranslations("auth.validation");

  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const schema = useMemo(
    () => createResetPasswordSchema((key) => tv(key)),
    [tv],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: ResetPasswordFormData) {
    setGlobalError(null);

    if (!token) {
      setGlobalError(t("missingToken"));
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setGlobalError(result.error || t("genericError"));
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch {
      setGlobalError(t("genericError"));
    }
  }

  if (!token) {
    return (
      <AuthCard title={t("invalidLinkTitle")} description="">
        <p className="mb-6 text-center text-sm text-zinc-400">
          {t("invalidLinkMessage")}
        </p>
        <Link
          href="/forgot-password"
          className="flex items-center justify-center gap-2 text-sm text-blue-400 hover:text-blue-300"
        >
          {t("requestNewLink")}
        </Link>
      </AuthCard>
    );
  }

  if (success) {
    return (
      <AuthCard title={t("successTitle")} description="">
        <p className="mb-6 text-center text-sm text-zinc-400">
          {t("successMessage")}
        </p>
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
          label={t("passwordLabel")}
          type="password"
          placeholder={t("passwordPlaceholder")}
          error={errors.password?.message}
          registration={register("password")}
        />

        <FormField
          label={t("confirmPasswordLabel")}
          type="password"
          placeholder={t("confirmPasswordPlaceholder")}
          error={errors.confirmPassword?.message}
          registration={register("confirmPassword")}
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
