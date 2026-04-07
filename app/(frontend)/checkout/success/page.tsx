import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { CheckoutSuccessContent } from "@/components/checkout/checkout-success-content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.checkoutSuccess");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CheckoutSuccessPage() {
  const user = await requireAuth().catch(() => null);

  if (!user) {
    redirect("/login");
  }

  return <CheckoutSuccessContent />;
}
