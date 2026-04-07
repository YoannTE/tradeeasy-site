import Stripe from "stripe";

/**
 * Returns true if a real Stripe secret key is configured (not a placeholder).
 */
export function isStripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return false;
  if (key.includes("placeholder")) return false;
  return true;
}

/**
 * Stripe server-side client.
 * Safe to import even when keys are not configured — always check
 * isStripeConfigured() before calling Stripe APIs.
 */
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder",
  { apiVersion: "2026-02-25.clover" },
);

/**
 * Create a Stripe customer and return the customer ID.
 * Used during signup to link the Payload user to Stripe.
 */
export async function createStripeCustomer(email: string): Promise<string> {
  const customer = await stripe.customers.create({ email });
  return customer.id;
}
