import Stripe from "stripe";
import { stripe, isStripeConfigured } from "./stripe";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

interface CheckoutSessionParams {
  stripeCustomerId: string;
  plan: "monthly" | "annual";
  userId: string;
  promoCode?: string;
  skipTrial?: boolean;
}

/**
 * Create a Stripe Checkout Session with a 7-day trial.
 * Returns the Checkout URL where the user enters their payment info.
 */
export async function createCheckoutSession(
  params: CheckoutSessionParams,
): Promise<string> {
  if (!isStripeConfigured()) {
    console.log("[create-checkout] Stripe not configured — mock redirect");
    return `${APP_URL}/checkout/success?mock=true`;
  }

  const priceId =
    params.plan === "annual"
      ? process.env.STRIPE_PRICE_ANNUAL
      : process.env.STRIPE_PRICE_MONTHLY;

  if (!priceId) {
    throw new Error(
      `Missing STRIPE_PRICE_${params.plan.toUpperCase()} env var`,
    );
  }

  // Use a generous trial buffer (14 days). The actual 7-day trial starts
  // when the admin grants TradingView access — the hook adjusts trial_end
  // on Stripe to activation_date + 7 days.
  // Returning users (past subscription) skip the trial entirely.
  const subscriptionData: Stripe.Checkout.SessionCreateParams["subscription_data"] =
    {
      metadata: { userId: params.userId, plan: params.plan },
    };

  if (!params.skipTrial) {
    subscriptionData.trial_period_days = 14;
  }

  const sessionConfig: Stripe.Checkout.SessionCreateParams = {
    customer: params.stripeCustomerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: subscriptionData,
    metadata: { userId: params.userId, plan: params.plan },
    success_url: `${APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${APP_URL}/pricing`,
    payment_method_collection: "always",
  };

  // Apply promo code if provided
  if (params.promoCode) {
    const promotionCodes = await stripe.promotionCodes.list({
      code: params.promoCode,
      active: true,
      limit: 1,
    });

    if (promotionCodes.data.length > 0) {
      sessionConfig.discounts = [{ promotion_code: promotionCodes.data[0].id }];
    }
  }

  // If no discounts applied, allow user to enter promo code on checkout page
  if (!sessionConfig.discounts) {
    sessionConfig.allow_promotion_codes = true;
  }

  const session = await stripe.checkout.sessions.create(sessionConfig);

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  return session.url;
}
