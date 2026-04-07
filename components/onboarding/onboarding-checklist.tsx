import { CheckCircle, Circle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface ChecklistItem {
  titleKey: string;
  descriptionKey: string;
  href?: string;
  external?: boolean;
}

const checklistItems: ChecklistItem[] = [
  {
    titleKey: "createTv.title",
    descriptionKey: "createTv.description",
    href: "https://www.tradingview.com",
    external: true,
  },
  {
    titleKey: "setupChart.title",
    descriptionKey: "setupChart.description",
  },
  {
    titleKey: "watchTutorial.title",
    descriptionKey: "watchTutorial.description",
    href: "/videos",
  },
];

export async function OnboardingChecklist() {
  const t = await getTranslations("onboarding.checklist");

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-zinc-50">{t("title")}</h2>

      <div className="space-y-3">
        {checklistItems.map((item) => (
          <ChecklistCard
            key={item.titleKey}
            title={t(item.titleKey)}
            description={t(item.descriptionKey)}
            href={item.href}
            external={item.external}
          />
        ))}
      </div>
    </div>
  );
}

interface ChecklistCardProps {
  title: string;
  description: string;
  href?: string;
  external?: boolean;
}

function ChecklistCard({
  title,
  description,
  href,
  external,
}: ChecklistCardProps) {
  const content = (
    <div className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-zinc-700">
      <div className="mt-0.5 shrink-0 text-zinc-500">
        {href ? (
          <Circle className="h-5 w-5" />
        ) : (
          <CheckCircle className="h-5 w-5" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 font-medium text-zinc-50">
          {title}
          {external && <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />}
        </p>
        <p className="mt-1 text-sm text-zinc-400">{description}</p>
      </div>
    </div>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
