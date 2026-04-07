import { NextResponse } from "next/server";
import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { isStripeConfigured, stripe } from "@/lib/stripe/stripe";

export async function POST() {
  try {
    const payload = await getPayload({ config });
    const headers = await getHeaders();
    const { user } = await payload.auth({ headers });

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const stripeCustomerId = user.stripeCustomerId as string | undefined;

    if (!isStripeConfigured() || !stripeCustomerId) {
      return NextResponse.json({ url: "/dashboard", mock: true });
    }

    const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`;

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: returnUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[create-portal-session] Error:", error);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 },
    );
  }
}
