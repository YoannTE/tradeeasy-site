/**
 * Generic email sending utility.
 * Falls back to console.log when RESEND_API_KEY is missing or placeholder.
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ success: boolean; mock?: boolean; data?: unknown }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey.includes("placeholder")) {
    console.log(`[EMAIL] To: ${to} | Subject: ${subject}`);
    console.log(`[EMAIL] Body: ${html.substring(0, 200)}...`);
    return { success: true, mock: true };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: "SimplifyPro <noreply@simplifypro.com>",
      to,
      subject,
      html,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("[EMAIL] Failed to send email:", error);
    return { success: false };
  }
}
