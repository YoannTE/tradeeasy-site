import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";

export async function generateMetadata() {
  const t = await getTranslations("metadata.contact");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://simplify-pro.com/contact",
      siteName: "SimplifyPro",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">{t("title")}</h1>
        <p className="text-zinc-400">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <ContactForm />
        <ContactInfo />
      </div>
    </section>
  );
}
