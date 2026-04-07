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
import { createLoginSchema, type LoginFormData } from "./login-schema";

export function LoginForm() {
  const router = useRouter();
  const t = useTranslations("auth.login");
  const tv = useTranslations("auth.validation");
  const [globalError, setGlobalError] = useState<string | null>(null);

  const schema = useMemo(() => createLoginSchema((key) => tv(key)), [tv]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: LoginFormData) {
    setGlobalError(null);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setGlobalError(t("invalidCredentials"));
        return;
      }

      router.push("/dashboard");
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
          label={t("passwordLabel")}
          type="password"
          placeholder={t("passwordPlaceholder")}
          error={errors.password?.message}
          registration={register("password")}
        />

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            {t("forgotPassword")}
          </Link>
        </div>

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
          {t("noAccount")}{" "}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300">
            {t("signUpLink")}
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
