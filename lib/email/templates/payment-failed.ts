/**
 * Email template sent when a user's payment fails.
 * Prompts them to update their payment method.
 */

const translations = {
  en: {
    subject: "Action Required: Payment Failed for SimplifyPro",
    heading: "Payment Failed",
    message: "We were unable to process your payment for SimplifyPro.",
    warning:
      "<strong>Please update your payment method within 7 days</strong> to avoid losing access to SimplifyPro and your TradingView indicator.",
    cta: "Update Payment Method",
    footer: "If you need help, contact us at yoann@simplify-pro.com",
  },
  fr: {
    subject: "Action requise : echec du paiement SimplifyPro",
    heading: "Paiement echoue",
    message: "Nous n'avons pas pu traiter votre paiement pour SimplifyPro.",
    warning:
      "<strong>Veuillez mettre a jour votre moyen de paiement sous 7 jours</strong> pour eviter de perdre l'acces a SimplifyPro et a votre indicateur TradingView.",
    cta: "Mettre a jour le moyen de paiement",
    footer: "Besoin d'aide ? Contactez-nous a yoann@simplify-pro.com",
  },
} as const;

export function paymentFailedEmail(locale: "en" | "fr" = "en"): {
  subject: string;
  html: string;
} {
  const t = translations[locale];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

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
      <p style="color:#a3a3a3;line-height:1.6;margin:0 0 16px;">${t.message}</p>
      <div style="background:#450a0a;border:1px solid #dc2626;border-radius:8px;padding:16px;margin:24px 0;">
        <p style="color:#fca5a5;margin:0;">${t.warning}</p>
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
