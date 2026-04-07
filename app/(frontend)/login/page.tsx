import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/components/auth/login-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.login");
  const title = `${t("title")} | SimplifyPro`;
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://simplifypro.com/login",
      siteName: "SimplifyPro",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function LoginPage() {
  return <LoginForm />;
}
