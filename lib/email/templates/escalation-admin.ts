/**
 * Email template sent to the admin when a user has been waiting
 * for TradingView access for more than 6 hours.
 */
export function escalationAdminEmail(
  email: string,
  tradingviewUsername: string,
  hoursWaiting: number,
): {
  subject: string;
  html: string;
} {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const roundedHours = Math.round(hoursWaiting);

  return {
    subject: "URGENT: User waiting >6h for TradingView access",
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#09090b;color:#e5e5e5;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#22c55e;font-size:28px;margin:0;">SimplifyPro</h1>
    </div>
    <div style="background:#171717;border-radius:12px;padding:32px;border:1px solid #262626;">
      <h2 style="color:#ef4444;font-size:22px;margin:0 0 16px;">
        Action Required: User Waiting for Access
      </h2>
      <p style="color:#a3a3a3;line-height:1.6;margin:0 0 16px;">
        A user has been waiting for TradingView access for
        <strong style="color:#ffffff;">${roundedHours} hours</strong>.
      </p>
      <div style="background:#451a03;border:1px solid #ea580c;border-radius:8px;padding:16px;margin:24px 0;">
        <p style="color:#fb923c;margin:0 0 8px;"><strong>User details:</strong></p>
        <p style="color:#fb923c;margin:0;line-height:1.8;">
          Email: <strong style="color:#ffffff;">${email}</strong><br/>
          TradingView: <strong style="color:#ffffff;">${tradingviewUsername}</strong>
        </p>
      </div>
      <p style="color:#a3a3a3;line-height:1.6;margin:0 0 16px;">
        Please grant access as soon as possible to ensure a good experience.
      </p>
      <div style="text-align:center;margin:24px 0 0;">
        <a href="${appUrl}/admin" style="display:inline-block;background:#22c55e;color:#000;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold;">
          Go to Admin Panel
        </a>
      </div>
    </div>
    <p style="text-align:center;color:#525252;font-size:12px;margin-top:32px;">
      SimplifyPro &mdash; Smart Trading Made Simple
    </p>
  </div>
</body>
</html>`.trim(),
  };
}
