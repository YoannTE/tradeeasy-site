import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SignupForm } from "@/components/auth/signup-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.signup");
  const title = `${t("title")} | SimplifyPro`;
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://simplifypro.com/signup",
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

export default function SignupPage() {
  return <SignupForm />;
}
