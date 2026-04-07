/**
 * Email template sent to the admin when a new subscriber signs up.
 */
export function newSubscriberAdminEmail(
  email: string,
  tradingviewUsername: string,
): { subject: string; html: string } {
  const adminUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admin/collections/users`;

  return {
    subject: `New SimplifyPro Subscriber: ${tradingviewUsername}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#0a0a0a;color:#e5e5e5;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#22c55e;font-size:28px;margin:0;">SimplifyPro Admin</h1>
    </div>
    <div style="background:#171717;border-radius:12px;padding:32px;border:1px solid #262626;">
      <h2 style="color:#ffffff;font-size:22px;margin:0 0 16px;">
        New subscriber needs TradingView access
      </h2>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <tr>
          <td style="color:#737373;padding:8px 0;width:140px;">Email:</td>
          <td style="color:#ffffff;padding:8px 0;">${email}</td>
        </tr>
        <tr>
          <td style="color:#737373;padding:8px 0;">TradingView:</td>
          <td style="color:#ffffff;padding:8px 0;">${tradingviewUsername}</td>
        </tr>
      </table>
      <div style="background:#172554;border:1px solid #1d4ed8;border-radius:8px;padding:16px;margin:24px 0;">
        <p style="color:#60a5fa;margin:0;">
          <strong>Action required:</strong> Grant invite-only access on TradingView,
          then mark as "Granted" in the admin panel.
        </p>
      </div>
      <a href="${adminUrl}" style="display:inline-block;background:#22c55e;color:#000;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold;margin-top:8px;">
        Open Admin Panel
      </a>
    </div>
    <p style="text-align:center;color:#525252;font-size:12px;margin-top:32px;">
      SimplifyPro Admin Notification
    </p>
  </div>
</body>
</html>`.trim(),
  };
}
