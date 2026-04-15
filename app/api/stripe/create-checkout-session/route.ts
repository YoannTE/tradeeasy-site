import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { headers as getHeaders } from "next/headers";
import { z } from "zod";
import { createCheckoutSession } from "@/lib/stripe/create-checkout";
import { createStripeCustomer, isStripeConfigured } from "@/lib/stripe/stripe";

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

    let stripeCustomerId = user.stripeCustomerId as string | undefined;
    if (!stripeCustomerId) {
      if (!isStripeConfigured()) {
        return NextResponse.json(
          { error: "Stripe is not configured." },
          { status: 500 },
        );
      }
      if (!user.email) {
        return NextResponse.json(
          { error: "User has no email on file." },
          { status: 400 },
        );
      }
      stripeCustomerId = await createStripeCustomer(user.email);
      await payload.update({
        collection: "users",
        id: user.id,
        data: { stripeCustomerId },
        overrideAccess: true,
      });
    }

    // Check for existing active subscription (prevent double subscription)
    const existingSub = await payload.find({
      collection: "subscriptions",
      overrideAccess: true,
      where: {
        user: { equals: user.id },
        status: { in: ["trial", "active", "payment_failed"] },
      },
      limit: 1,
    });

    if (existingSub.docs.length > 0) {
      return NextResponse.json(
        { error: "You already have an active subscription." },
        { status: 409 },
      );
    }

    // Check if user has ever had a subscription (no re-trial for returning users)
    const pastSub = await payload.find({
      collection: "subscriptions",
      overrideAccess: true,
      where: { user: { equals: user.id } },
      limit: 1,
    });
    const isReturningUser = pastSub.docs.length > 0;

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
      skipTrial: isReturningUser,
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
