/**
 * Email template sent to the user after signup.
 * Welcomes them and provides a preparation checklist.
 */

const translations = {
  en: {
    subject: "Welcome to SimplifyPro! Your access is on its way",
    heading: "Welcome to SimplifyPro!",
    greeting: (username: string) =>
      `Thanks for signing up, <strong style="color:#ffffff;">${username}</strong>! Your TradingView access will be activated within 12 hours.`,
    prepareTitle: "In the meantime, here&rsquo;s how to prepare:",
    step1:
      'Create a <a href="https://www.tradingview.com" style="color:#22c55e;">TradingView</a> account if you don&rsquo;t have one',
    step2: "Set up your chart workspace",
    step3: "Watch our installation tutorial videos",
    step4: "Browse our trading guides",
    cta: "Watch Tutorial Videos",
    footer: "Questions? Contact us at yoann@simplify-pro.com",
  },
  fr: {
    subject: "Bienvenue sur SimplifyPro ! Votre acces est en route",
    heading: "Bienvenue sur SimplifyPro !",
    greeting: (username: string) =>
      `Merci de vous etre inscrit, <strong style="color:#ffffff;">${username}</strong> ! Votre acces TradingView sera active sous 12 heures.`,
    prepareTitle: "En attendant, voici comment vous preparer :",
    step1:
      'Creez un compte <a href="https://www.tradingview.com" style="color:#22c55e;">TradingView</a> si vous n\'en avez pas',
    step2: "Configurez votre espace graphique",
    step3: "Regardez nos tutoriels video d'installation",
    step4: "Parcourez nos guides de trading",
    cta: "Voir les tutoriels video",
    footer: "Des questions ? Contactez-nous a yoann@simplify-pro.com",
  },
} as const;

export function welcomeEmail(
  tradingviewUsername: string,
  locale: "en" | "fr" = "en",
): {
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
      <p style="color:#a3a3a3;line-height:1.6;margin:0 0 16px;">${t.greeting(tradingviewUsername)}</p>
      <p style="color:#a3a3a3;line-height:1.6;margin:0 0 8px;">${t.prepareTitle}</p>
      <div style="background:#052e16;border:1px solid #16a34a;border-radius:8px;padding:16px;margin:24px 0;">
        <ol style="color:#a3a3a3;line-height:2;margin:0;padding-left:20px;">
          <li>${t.step1}</li>
          <li>${t.step2}</li>
          <li>${t.step3}</li>
          <li>${t.step4}</li>
        </ol>
      </div>
      <div style="text-align:center;margin:24px 0 0;">
        <a href="${appUrl}/videos" style="display:inline-block;background:#22c55e;color:#000;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold;">${t.cta}</a>
      </div>
    </div>
    <p style="text-align:center;color:#525252;font-size:12px;margin-top:32px;">${t.footer}</p>
  </div>
</body>
</html>`.trim(),
  };
}
