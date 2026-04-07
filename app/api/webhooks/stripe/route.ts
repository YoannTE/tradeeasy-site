import { NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe/stripe";
import {
  isEventAlreadyProcessed,
  handleCheckoutCompleted,
  handleSubscriptionCreated,
  handlePaymentSucceeded,
} from "@/lib/stripe/webhook-handlers";
import {
  handlePaymentFailed,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
} from "@/lib/stripe/webhook-handlers-extra";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: Request) {
  // Read raw body BEFORE any parsing
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!isStripeConfigured()) {
    console.log("[webhook] Stripe not configured — skipping event processing");
    return NextResponse.json({ received: true });
  }

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 },
    );
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`[webhook] Signature verification failed: ${message}`);
    return NextResponse.json(
      { error: "Webhook signature verification failed." },
      { status: 400 },
    );
  }

  console.log(`[webhook] Received event: ${event.type} (${event.id})`);

  // Idempotence check: skip if this event was already processed
  const alreadyProcessed = await isEventAlreadyProcessed(event.id);
  if (alreadyProcessed) {
    console.log(`[webhook] Event ${event.id} already processed — skipping`);
    return NextResponse.json({ received: true });
  }

  // Route the event to the appropriate handler
  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event);
        break;
      case "customer.subscription.created":
        await handleSubscriptionCreated(event);
        break;
      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event);
        break;
      case "invoice.payment_failed":
        await handlePaymentFailed(event);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event);
        break;
      default:
        console.log(`[webhook] Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`[webhook] Error handling ${event.type}:`, error);
    // Return 200 to avoid Stripe retries for processing errors
  }

  return NextResponse.json({ received: true });
}
