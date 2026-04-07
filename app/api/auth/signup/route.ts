import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { z } from "zod";
import { cookies } from "next/headers";
import { sendEmail } from "@/lib/email/send-email";
import { welcomeEmail } from "@/lib/email/templates/welcome";
import { rateLimit } from "@/lib/rate-limit";

const signupBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  tradingviewUsername: z.string().min(1),
});

const errorMessages = {
  en: {
    rateLimit: "Too many requests. Please try again later.",
    invalidInput: "Invalid input. Please check your fields.",
    emailExists: "An account with this email already exists.",
    tvExists: "This TradingView username is already registered.",
    generic: "Something went wrong. Please try again.",
  },
  fr: {
    rateLimit: "Trop de requetes. Veuillez reessayer plus tard.",
    invalidInput: "Saisie invalide. Veuillez verifier vos champs.",
    emailExists: "Un compte avec cet email existe deja.",
    tvExists: "Ce nom d'utilisateur TradingView est deja enregistre.",
    generic: "Une erreur est survenue. Veuillez reessayer.",
  },
} as const;

function getLocale(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
): "en" | "fr" {
  return cookieStore.get("locale")?.value === "fr" ? "fr" : "en";
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const locale = getLocale(cookieStore);
  const msg = errorMessages[locale];

  try {
    // Rate limit: max 5 signups per IP per hour
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (!rateLimit(ip, 5, 3600000)) {
      return NextResponse.json({ error: msg.rateLimit }, { status: 429 });
    }

    const body = await request.json();
    const parsed = signupBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: msg.invalidInput }, { status: 400 });
    }

    const { email, password, tradingviewUsername } = parsed.data;
    const payload = await getPayload({ config });

    // Check if email is already taken
    const existingEmail = await payload.find({
      collection: "users",
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    });

    if (existingEmail.docs.length > 0) {
      return NextResponse.json({ error: msg.emailExists }, { status: 409 });
    }

    // Check if TradingView username is already taken
    const existingTV = await payload.find({
      collection: "users",
      where: { tradingviewUsername: { equals: tradingviewUsername } },
      limit: 1,
      overrideAccess: true,
    });

    if (existingTV.docs.length > 0) {
      return NextResponse.json({ error: msg.tvExists }, { status: 409 });
    }

    // Create user with overrideAccess (access control blocks non-admin creation)
    const user = await payload.create({
      collection: "users",
      data: {
        email,
        password,
        tradingviewUsername,
        role: "editor",
      },
      overrideAccess: true,
    });

    // Check if Stripe is configured and create customer if so
    try {
      const { isStripeConfigured, createStripeCustomer } =
        await import("@/lib/stripe/stripe");
      if (isStripeConfigured()) {
        const stripeCustomerId = await createStripeCustomer(email);
        await payload.update({
          collection: "users",
          id: user.id,
          data: { stripeCustomerId },
          overrideAccess: true,
        });
      }
    } catch {
      // Stripe module not available yet (other agent), skip silently
    }

    // Send welcome email (fire-and-forget)
    const emailData = welcomeEmail(tradingviewUsername, locale);
    sendEmail({ to: email, ...emailData }).catch(console.error);

    // Auto-login: use Payload login to set cookies
    const loginResult = await payload.login({
      collection: "users",
      data: { email, password },
    });

    const response = NextResponse.json(
      { success: true, user: { id: user.id, email: user.email } },
      { status: 201 },
    );

    // Set the Payload auth cookie
    if (loginResult.token) {
      response.cookies.set("payload-token", loginResult.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
    }

    return response;
  } catch (error) {
    console.error("[signup] Error:", error);
    return NextResponse.json({ error: msg.generic }, { status: 500 });
  }
}
