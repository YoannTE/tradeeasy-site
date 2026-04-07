"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { AuthCard } from "./auth-card";
import { FormField } from "./form-field";
import { createSignupSchema, type SignupFormData } from "./signup-schema";

export function SignupForm() {
  const router = useRouter();
  const t = useTranslations("auth.signup");
  const tv = useTranslations("auth.validation");
  const [globalError, setGlobalError] = useState<string | null>(null);

  const schema = useMemo(() => createSignupSchema((key) => tv(key)), [tv]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: SignupFormData) {
    setGlobalError(null);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setGlobalError(result.error || t("genericError"));
        return;
      }

      router.push("/onboarding");
      router.refresh();
    } catch {
      setGlobalError(t("genericError"));
    }
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

        <FormField
          label={t("tvUsernameLabel")}
          placeholder={t("tvUsernamePlaceholder")}
          error={errors.tradingviewUsername?.message}
          registration={register("tradingviewUsername")}
        />

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

        <p className="text-center text-sm text-zinc-400">
          {t("alreadyHaveAccount")}{" "}
          <Link href="/login" className="text-blue-400 hover:text-blue-300">
            {t("signInLink")}
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
