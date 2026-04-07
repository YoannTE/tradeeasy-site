import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.forgotPassword");
  return {
    title: `${t("title")} | SimplifyPro`,
    description: t("description"),
  };
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
