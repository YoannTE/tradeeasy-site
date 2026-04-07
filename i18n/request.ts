import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { locales, defaultLocale } from "./config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  // 1. Check cookie
  let locale = cookieStore.get("locale")?.value;

  // 2. Fallback to Accept-Language header
  if (!locale) {
    const acceptLang = headerStore.get("accept-language") ?? "";
    if (acceptLang.includes("fr")) locale = "fr";
    else if (acceptLang.includes("es")) locale = "es";
    else if (acceptLang.includes("de")) locale = "de";
  }

  // 3. Default
  if (!locale || !locales.includes(locale as (typeof locales)[number]))
    locale = defaultLocale;

  const messages = (await import(`../messages/${locale}.json`)).default;
  return { locale, messages };
});
