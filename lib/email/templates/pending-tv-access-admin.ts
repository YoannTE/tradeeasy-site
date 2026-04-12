/**
 * Email sent to the admin when a paying subscriber needs TradingView access.
 * Triggered from Stripe webhook (checkout.session.completed).
 */
export function pendingTvAccessAdminEmail(params: {
  email: string;
  tradingviewUsername: string;
  firstName?: string;
  lastName?: string;
  plan?: string;
}): { subject: string; html: string } {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const scriptUrl =
    process.env.TRADINGVIEW_SCRIPT_MANAGE_URL ||
    "https://www.tradingview.com/chart/";
  const pendingUrl = `${appUrl}/admin-tools/pending-access`;
  const fullName =
    [params.firstName, params.lastName].filter(Boolean).join(" ") ||
    params.email;
  const plan = params.plan ? params.plan.toUpperCase() : "—";

  return {
    subject: `💰 Paiement recu — accorder l'acces TV a @${params.tradingviewUsername}`,
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#0a0a0a;color:#e5e5e5;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#22c55e;font-size:28px;margin:0;">Paiement confirme</h1>
    </div>
    <div style="background:#171717;border-radius:12px;padding:32px;border:1px solid #262626;">
      <h2 style="color:#ffffff;font-size:22px;margin:0 0 16px;">
        Accorde l'acces TradingView a ce client
      </h2>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <tr>
          <td style="color:#737373;padding:8px 0;width:140px;">Client :</td>
          <td style="color:#ffffff;padding:8px 0;">${fullName}</td>
        </tr>
        <tr>
          <td style="color:#737373;padding:8px 0;">Email :</td>
          <td style="color:#ffffff;padding:8px 0;">${params.email}</td>
        </tr>
        <tr>
          <td style="color:#737373;padding:8px 0;">TradingView :</td>
          <td style="color:#ffffff;padding:8px 0;font-family:monospace;font-size:18px;">
            <strong>@${params.tradingviewUsername}</strong>
          </td>
        </tr>
        <tr>
          <td style="color:#737373;padding:8px 0;">Plan :</td>
          <td style="color:#ffffff;padding:8px 0;">${plan}</td>
        </tr>
      </table>
      <div style="background:#1e3a8a;border:1px solid #1d4ed8;border-radius:8px;padding:16px;margin:24px 0;">
        <p style="color:#93c5fd;margin:0;line-height:1.5;">
          <strong>1.</strong> Ajoute <code style="background:#0a0a0a;padding:2px 6px;border-radius:4px;">${params.tradingviewUsername}</code> sur ton script TradingView (acces invite-only).<br/>
          <strong>2.</strong> Clique "Accorder l'acces" dans ton dashboard admin pour activer l'essai 7 jours.
        </p>
      </div>
      <div style="margin-top:24px;">
        <a href="${scriptUrl}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:bold;margin-right:8px;margin-bottom:8px;">
          Ouvrir TradingView
        </a>
        <a href="${pendingUrl}" style="display:inline-block;background:#22c55e;color:#000000;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:bold;margin-bottom:8px;">
          Dashboard admin
        </a>
      </div>
    </div>
    <p style="text-align:center;color:#525252;font-size:12px;margin-top:32px;">
      Notification automatique — SimplifyPro
    </p>
  </div>
</body>
</html>`.trim(),
  };
}
