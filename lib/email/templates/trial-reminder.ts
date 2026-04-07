/**
 * Email template sent 2 days before a user's trial ends.
 * Reminds them of the upcoming charge.
 */

const translations = {
  en: {
    subject: "Your SimplifyPro trial ends in 2 days",
    heading: "Your trial ends in 2 days",
    message: (date: string) =>
      `Your 7-day free trial ends on <strong style="color:#ffffff;">${date}</strong>.`,
    chargeNote: (price: string) =>
      `After that, you&rsquo;ll be charged <strong style="color:#ffffff;">${price}</strong>.`,
    keepAccess:
      "To keep your access, <strong>no action is needed</strong> &mdash; your card will be charged automatically.",
    cancelNote: "To cancel, visit your dashboard before your trial ends.",
    cta: "Go to Dashboard",
    footer: "SimplifyPro &mdash; Smart Trading Made Simple",
  },
  fr: {
    subject: "Votre essai SimplifyPro se termine dans 2 jours",
    heading: "Votre essai se termine dans 2 jours",
    message: (date: string) =>
      `Votre essai gratuit de 7 jours se termine le <strong style="color:#ffffff;">${date}</strong>.`,
    chargeNote: (price: string) =>
      `Apres cette date, vous serez debite de <strong style="color:#ffffff;">${price}</strong>.`,
    keepAccess:
      "Pour conserver votre acces, <strong>aucune action n'est requise</strong> &mdash; votre carte sera debitee automatiquement.",
    cancelNote:
      "Pour annuler, rendez-vous sur votre tableau de bord avant la fin de l'essai.",
    cta: "Aller au tableau de bord",
    footer: "SimplifyPro &mdash; Le trading intelligent simplifie",
  },
} as const;

export function trialReminderEmail(
  trialEndDate: string,
  planType: string,
  locale: "en" | "fr" = "en",
): {
  subject: string;
  html: string;
} {
  const t = translations[locale];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const price = planType === "annual" ? "$349/year" : "$49/month";

  return {
    subject: t.subject,
    html: `
<!DOCTYPE html>
<html lang="${locale}">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#09090b;color:#e5e5e5;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#22c55e;font-size:28px;margin:0;">SimplifyPro</h1>
    </div>
    <div style="background:#171717;border-radius:12px;padding:32px;border:1px solid #262626;">
      <h2 style="color:#ffffff;font-size:22px;margin:0 0 16px;">${t.heading}</h2>
      <p style="color:#a3a3a3;line-height:1.6;margin:0 0 16px;">${t.message(trialEndDate)}</p>
      <p style="color:#a3a3a3;line-height:1.6;margin:0 0 16px;">${t.chargeNote(price)}</p>
      <div style="background:#172554;border:1px solid #1d4ed8;border-radius:8px;padding:16px;margin:24px 0;">
        <p style="color:#60a5fa;margin:0;line-height:1.6;">${t.keepAccess}</p>
        <p style="color:#60a5fa;margin:12px 0 0;line-height:1.6;">${t.cancelNote}</p>
      </div>
      <div style="text-align:center;margin:24px 0 0;">
        <a href="${appUrl}/dashboard" style="display:inline-block;background:#22c55e;color:#000;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold;">${t.cta}</a>
      </div>
    </div>
    <p style="text-align:center;color:#525252;font-size:12px;margin-top:32px;">${t.footer}</p>
  </div>
</body>
</html>`.trim(),
  };
}
