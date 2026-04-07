/**
 * Email template sent to the user when their TradingView access is granted.
 */

const translations = {
  en: {
    subject: "Your TradingView Access is Now Active!",
    heading: "Your TradingView access is now active!",
    message: (username: string) =>
      `Great news! The SimplifyPro V6.0 indicator has been activated on your TradingView account <strong style="color:#ffffff;">${username}</strong>.`,
    howToStart: "How to get started:",
    step1:
      'Open <a href="https://www.tradingview.com" style="color:#22c55e;">TradingView</a>',
    step2: "Go to Indicators &amp; Strategies",
    step3:
      'Search for <strong style="color:#ffffff;">SimplifyPro V6.0</strong> under "Invite-only scripts"',
    step4: "Add it to your chart and start trading!",
    trialNote: "Your 7-day free trial starts now. Enjoy exploring SimplifyPro!",
    help: "Need help? Reply to this email or contact our support team.",
    footer: "SimplifyPro &mdash; Smart Trading Made Simple",
  },
  fr: {
    subject: "Votre acces TradingView est maintenant actif !",
    heading: "Votre acces TradingView est maintenant actif !",
    message: (username: string) =>
      `Bonne nouvelle ! L'indicateur SimplifyPro V6.0 a ete active sur votre compte TradingView <strong style="color:#ffffff;">${username}</strong>.`,
    howToStart: "Comment commencer :",
    step1:
      'Ouvrez <a href="https://www.tradingview.com" style="color:#22c55e;">TradingView</a>',
    step2: "Allez dans Indicateurs et Strategies",
    step3:
      'Recherchez <strong style="color:#ffffff;">SimplifyPro V6.0</strong> dans &laquo; Scripts sur invitation &raquo;',
    step4: "Ajoutez-le a votre graphique et commencez a trader !",
    trialNote:
      "Votre essai gratuit de 7 jours commence maintenant. Profitez d'SimplifyPro !",
    help: "Besoin d'aide ? Repondez a cet email ou contactez notre equipe support.",
    footer: "SimplifyPro &mdash; Le trading intelligent simplifie",
  },
} as const;

export function accessGrantedEmail(
  tradingviewUsername: string,
  locale: "en" | "fr" = "en",
): {
  subject: string;
  html: string;
} {
  const t = translations[locale];

  return {
    subject: t.subject,
    html: `
<!DOCTYPE html>
<html lang="${locale}">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#0a0a0a;color:#e5e5e5;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#22c55e;font-size:28px;margin:0;">SimplifyPro</h1>
    </div>
    <div style="background:#171717;border-radius:12px;padding:32px;border:1px solid #262626;">
      <h2 style="color:#ffffff;font-size:22px;margin:0 0 16px;">${t.heading}</h2>
      <p style="color:#a3a3a3;line-height:1.6;margin:0 0 16px;">${t.message(tradingviewUsername)}</p>
      <div style="background:#052e16;border:1px solid #16a34a;border-radius:8px;padding:16px;margin:24px 0;">
        <p style="color:#22c55e;margin:0;font-weight:bold;">${t.howToStart}</p>
        <ol style="color:#a3a3a3;line-height:1.8;margin:12px 0 0;padding-left:20px;">
          <li>${t.step1}</li>
          <li>${t.step2}</li>
          <li>${t.step3}</li>
          <li>${t.step4}</li>
        </ol>
      </div>
      <p style="color:#a3a3a3;line-height:1.6;margin:0 0 16px;">${t.trialNote}</p>
      <p style="color:#737373;font-size:13px;margin:24px 0 0;">${t.help}</p>
    </div>
    <p style="text-align:center;color:#525252;font-size:12px;margin-top:32px;">${t.footer}</p>
  </div>
</body>
</html>`.trim(),
  };
}
