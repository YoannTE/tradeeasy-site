import { Mail, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { LucideIcon } from "lucide-react";

const contactItemKeys = [
  { key: "email" as const, icon: Mail },
  { key: "responseTime" as const, icon: Clock },
];

export async function ContactInfo() {
  const t = await getTranslations("contact.info");

  return (
    <div className="flex flex-col gap-6">
      {contactItemKeys.map((item) => (
        <ContactInfoCard
          key={item.key}
          icon={item.icon}
          title={t(`${item.key}.title`)}
          description={t(`${item.key}.description`)}
          detail={t(`${item.key}.detail`)}
        />
      ))}
    </div>
  );
}

interface ContactInfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
}

function ContactInfoCard({
  icon: Icon,
  title,
  description,
  detail,
}: ContactInfoCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <p className="text-lg font-medium text-zinc-50">{description}</p>
      <p className="mt-1 text-sm text-zinc-400">{detail}</p>
    </div>
  );
}
