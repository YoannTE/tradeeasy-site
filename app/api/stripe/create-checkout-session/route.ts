import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { headers as getHeaders } from "next/headers";
import { z } from "zod";
import { createCheckoutSession } from "@/lib/stripe/create-checkout";

const requestSchema = z.object({
  plan: z.enum(["monthly", "annual"]),
  promoCode: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config });
    const headers = await getHeaders();
    const { user } = await payload.auth({ headers });

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 },
      );
    }

    const stripeCustomerId = user.stripeCustomerId as string | undefined;
    if (!stripeCustomerId) {
      return NextResponse.json(
        { error: "No Stripe customer linked to this account." },
        { status: 400 },
      );
    }

    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid plan. Choose 'monthly' or 'annual'." },
        { status: 400 },
      );
    }

    const checkoutUrl = await createCheckoutSession({
      stripeCustomerId,
      plan: parsed.data.plan,
      userId: String(user.id),
      promoCode: parsed.data.promoCode,
    });

    return NextResponse.json({ data: { url: checkoutUrl } });
  } catch (error) {
    console.error("[create-checkout-session] Error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 },
    );
  }
}
