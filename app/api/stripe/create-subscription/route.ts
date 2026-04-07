import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { headers as getHeaders } from "next/headers";
import { z } from "zod";
import { createStripeSubscription } from "@/lib/stripe/create-checkout";

const requestSchema = z.object({
  email: z.string().email(),
  priceId: z.string().optional(),
});

export async function POST() {
  try {
    const payload = await getPayload({ config });
    const headers = await getHeaders();

    // Verify the user is authenticated
    const { user } = await payload.auth({ headers });

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to create a subscription." },
        { status: 401 },
      );
    }

    // Use the authenticated user's email
    const parsed = requestSchema.safeParse({ email: user.email });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data." },
        { status: 400 },
      );
    }

    const result = await createStripeSubscription(
      parsed.data.email,
      parsed.data.priceId,
    );

    return NextResponse.json({
      data: {
        customerId: result.customerId,
        subscriptionId: result.subscriptionId,
        clientSecret: "clientSecret" in result ? result.clientSecret : null,
      },
    });
  } catch (error) {
    console.error("[create-subscription] Error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription. Please try again." },
      { status: 500 },
    );
  }
}
