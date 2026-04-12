import { sendEmail } from "@/lib/email/send-email";
import { pendingTvAccessAdminEmail } from "@/lib/email/templates/pending-tv-access-admin";
import { sendTelegramMessage } from "./telegram";

/**
 * Notify the admin that a paying subscriber is waiting for TradingView access.
 * Sends both an email and a Telegram message (the latter is silently skipped
 * if no Telegram bot is configured).
 *
 * Fire-and-forget safe: errors are caught and logged, never rethrown.
 */
export async function notifyAdminPendingTvAccess(params: {
  email: string;
  tradingviewUsername: string;
  firstName?: string;
  lastName?: string;
  plan?: string;
}): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const scriptUrl =
    process.env.TRADINGVIEW_SCRIPT_MANAGE_URL ||
    "https://www.tradingview.com/chart/";

  // Email notification
  if (adminEmail) {
    try {
      const template = pendingTvAccessAdminEmail(params);
      await sendEmail({
        to: adminEmail,
        subject: template.subject,
        html: template.html,
      });
    } catch (error) {
      console.error("[notify-admin] Email failed:", error);
    }
  }

  // Telegram notification
  try {
    const fullName =
      [params.firstName, params.lastName].filter(Boolean).join(" ") ||
      params.email;
    const planLabel = params.plan ? params.plan.toUpperCase() : "—";
    const dashboardUrl = `${appUrl}/admin-tools/pending-access`;

    const text = [
      `💰 <b>Nouveau paiement SimplifyPro</b>`,
      ``,
      `👤 <b>${escapeHtml(fullName)}</b>`,
      `📧 ${escapeHtml(params.email)}`,
      `📊 TradingView : <code>${escapeHtml(params.tradingviewUsername)}</code>`,
      `💳 Plan : ${escapeHtml(planLabel)}`,
      ``,
      `<b>Action</b> : ajouter <code>${escapeHtml(params.tradingviewUsername)}</code> sur l'indicateur, puis accorder l'acces dans le dashboard.`,
      ``,
      `🔗 <a href="${scriptUrl}">TradingView</a>  ·  <a href="${dashboardUrl}">Dashboard admin</a>`,
    ].join("\n");

    await sendTelegramMessage(text);
  } catch (error) {
    console.error("[notify-admin] Telegram failed:", error);
  }
}

/**
 * Minimal HTML escape for Telegram HTML parse mode.
 * Telegram only needs <, >, & escaped in text nodes.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
