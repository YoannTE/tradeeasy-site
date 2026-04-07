import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { z } from "zod";
import { cookies } from "next/headers";

const forgotPasswordBodySchema = z.object({
  email: z.string().email(),
});

const errorMessages = {
  en: {
    invalidEmail: "Please provide a valid email address.",
    generic: "Something went wrong. Please try again.",
  },
  fr: {
    invalidEmail: "Veuillez fournir une adresse email valide.",
    generic: "Une erreur est survenue. Veuillez reessayer.",
  },
} as const;

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value === "fr" ? "fr" : "en";
  const msg = errorMessages[locale];

  try {
    const body = await request.json();
    const parsed = forgotPasswordBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: msg.invalidEmail }, { status: 400 });
    }

    const { email } = parsed.data;
    const payload = await getPayload({ config });

    // Always return success to avoid leaking whether the account exists
    try {
      await payload.forgotPassword({
        collection: "users",
        data: { email },
      });
    } catch {
      // If user doesn't exist, Payload may throw — we still return success
      console.log("[forgot-password] Token sent or user not found for:", email);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[forgot-password] Error:", error);
    return NextResponse.json({ error: msg.generic }, { status: 500 });
  }
}
