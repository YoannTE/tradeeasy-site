import { NextRequest, NextResponse } from "next/server";
import { locales } from "@/i18n/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const locale = body.locale;

    if (!locale || !locales.includes(locale)) {
      return NextResponse.json(
        { error: `Invalid locale. Must be one of: ${locales.join(", ")}` },
        { status: 400 },
      );
    }

    const response = NextResponse.json({ data: { locale } });
    response.cookies.set("locale", locale, {
      path: "/",
      maxAge: 31536000,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
