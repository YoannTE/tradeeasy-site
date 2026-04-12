/**
 * Send a message to a Telegram chat via a bot.
 * No-op silently when TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID are missing.
 *
 * To configure:
 * 1. Create a bot with @BotFather on Telegram, grab the token.
 * 2. Start a chat with the bot, then get the chat id by visiting
 *    https://api.telegram.org/bot<TOKEN>/getUpdates
 * 3. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in your env.
 */
export async function sendTelegramMessage(
  text: string,
): Promise<{ success: boolean; mock?: boolean }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId || token.includes("placeholder")) {
    console.log(
      `[TELEGRAM] Skipped (no token/chat id). Message: ${text.substring(0, 120)}...`,
    );
    return { success: true, mock: true };
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    if (!response.ok) {
      const body = await response.text();
      console.error(`[TELEGRAM] Send failed (${response.status}): ${body}`);
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("[TELEGRAM] Failed to send message:", error);
    return { success: false };
  }
}
