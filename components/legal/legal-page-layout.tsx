import { getTranslations } from "next-intl/server";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export async function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  const t = await getTranslations("legal");

  return (
    <section className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-2 text-3xl font-bold text-white">{title}</h1>
      <p className="mb-12 text-sm text-zinc-500">
        {t("lastUpdated")} {lastUpdated}
      </p>
      <div className="space-y-8 text-zinc-300 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_p]:leading-relaxed">
        {children}
      </div>
    </section>
  );
}
