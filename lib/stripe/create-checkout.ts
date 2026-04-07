import { stripe, isStripeConfigured } from "./stripe";

interface MockCheckoutResult {
  mock: true;
  customerId: string;
  subscriptionId: string;
}

interface StripeCheckoutResult {
  mock?: false;
  customerId: string;
  subscriptionId: string;
  clientSecret: string | null;
}

export type CheckoutResult = MockCheckoutResult | StripeCheckoutResult;

/**
 * Create a Stripe customer + subscription with a 7-day trial.
 * Returns mock data when Stripe keys are not configured.
 */
export async function createStripeSubscription(
  email: string,
  priceId?: string,
): Promise<CheckoutResult> {
  if (!isStripeConfigured()) {
    console.log(
      "[create-checkout] Stripe not configured — returning mock data",
    );
    return {
      mock: true,
      customerId: "mock_cus_" + Date.now(),
      subscriptionId: "mock_sub_" + Date.now(),
    };
  }

  // Create a Stripe Customer
  const customer = await stripe.customers.create({ email });

  // Create a Subscription with 7-day trial
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: priceId || process.env.STRIPE_PRICE_ID || "" }],
    trial_period_days: 7,
    payment_behavior: "default_incomplete",
    expand: ["latest_invoice"],
  });

  // Extract client_secret from the invoice confirmation_secret (Stripe clover API)
  const latestInvoice = subscription.latest_invoice;
  let clientSecret: string | null = null;

  if (latestInvoice && typeof latestInvoice === "object") {
    clientSecret = latestInvoice.confirmation_secret?.client_secret ?? null;
  }

  return {
    customerId: customer.id,
    subscriptionId: subscription.id,
    clientSecret,
  };
}
