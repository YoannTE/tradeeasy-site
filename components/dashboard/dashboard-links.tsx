import Link from "next/link";
import { PlayCircle, CreditCard, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface QuickLink {
  labelKey: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}

const quickLinks: QuickLink[] = [
  {
    labelKey: "videosTutorials",
    href: "/videos",
    icon: <PlayCircle className="h-5 w-5" />,
  },
  {
    labelKey: "manageBilling",
    href: "/dashboard",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    labelKey: "contactSupport",
    href: "/contact",
    icon: <Mail className="h-5 w-5" />,
  },
];

export async function DashboardLinks() {
  const t = await getTranslations("dashboard.links");

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-zinc-50">{t("title")}</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {quickLinks.map((link) => {
          const label = t(link.labelKey);
          const content = (
            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-zinc-700">
              <div className="text-blue-400">{link.icon}</div>
              <span className="text-sm font-medium text-zinc-200">{label}</span>
            </div>
          );

          if (link.external) {
            return (
              <a
                key={link.labelKey}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={link.labelKey} href={link.href}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
