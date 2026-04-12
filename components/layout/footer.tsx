import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Logo } from "./logo";

export async function Footer() {
  const t = await getTranslations("footer");

  const productLinks = [
    { label: t("features"), href: "/#features" },
    { label: t("pricing"), href: "/pricing" },
    { label: t("videos"), href: "/videos" },
    { label: t("guides"), href: "/guides" },
  ];

  const communityLinks = [
    { label: t("youtube"), href: "#" },
    { label: t("affiliate"), href: "/affiliate" },
  ];

  const legalLinks = [
    { label: t("terms"), href: "/legal/terms" },
    { label: t("privacy"), href: "/legal/privacy" },
    { label: t("disclaimer"), href: "/legal/disclaimer" },
  ];

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo size="sm" />
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              {t("tagline")}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t("product")}</h3>
            <ul className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t("community")}</h3>
            <ul className="flex flex-col gap-3">
              {communityLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t("legal")}</h3>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-zinc-800 pt-8">
          <p className="text-sm text-zinc-500">{t("copyright")}</p>
          <p className="mt-2 text-xs text-zinc-600">{t("riskWarning")}</p>
        </div>
      </div>
    </footer>
  );
}
