import "server-only";
import Stripe from "stripe";
import { getGuaranteeCheckoutMessage } from "./guarantee";
import type { Listing } from "./types";

/**
 * The only module that touches the Stripe SDK (enforced by ESLint).
 *
 * Environment:
 *   STRIPE_SECRET_KEY       sk_test_... in development; sk_live_... in production
 *   STRIPE_WEBHOOK_SECRET   whsec_... for /api/stripe/webhook
 *   STRIPE_LIVE_MODE        must be "enabled" before a live key is accepted —
 *                           a guard against shipping live keys by accident.
 */

export type CheckoutErrorCode = "checkout_unavailable" | "session_failed";

export class CheckoutError extends Error {
  constructor(
    public readonly code: CheckoutErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "CheckoutError";
  }
}

let client: Stripe | null = null;

function getClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new CheckoutError("checkout_unavailable", "STRIPE_SECRET_KEY is not set.");
  if (key.startsWith("sk_live_") && process.env.STRIPE_LIVE_MODE !== "enabled") {
    throw new CheckoutError("checkout_unavailable", 'A live Stripe key is configured but STRIPE_LIVE_MODE is not "enabled".');
  }
  client ??= new Stripe(key, { appInfo: { name: "EcomCla" }, maxNetworkRetries: 2 });
  return client;
}

export function getStripeMode(): "test" | "live" | "unconfigured" {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return "unconfigured";
  return key.startsWith("sk_live_") ? "live" : "test";
}

const SESSION_LIFETIME_SECONDS = 30 * 60; // Stripe's minimum; keeps a listing from being held open for long.

/** Creates a hosted Checkout session for a listing's asking price and returns its URL. */
export async function createListingCheckoutSession(listing: Listing, origin: string): Promise<string> {
  const stripe = getClient();
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: listing.currency.toLowerCase(),
            unit_amount: Math.round(listing.askingPrice * 100),
            product_data: {
              name: `${listing.name}: business acquisition`,
              description: `${listing.niche} Shopify business. Funds are held until you confirm receipt of all assets.`,
              metadata: { listingSlug: listing.slug },
            },
          },
        },
      ],
      metadata: { listingSlug: listing.slug },
      payment_intent_data: {
        description: `EcomCla purchase: ${listing.name}`,
        metadata: { listingSlug: listing.slug },
      },
      billing_address_collection: "required",
      customer_creation: "always",
      expires_at: Math.floor(Date.now() / 1000) + SESSION_LIFETIME_SECONDS,
      // The guarantee is the last thing the buyer reads, directly above Stripe's Pay button.
      custom_text: { submit: { message: getGuaranteeCheckoutMessage(`${origin}/guarantee`) } },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancelled?listing=${encodeURIComponent(listing.slug)}`,
    });
    if (!session.url) throw new Error("Stripe returned a session without a URL.");
    return session.url;
  } catch (error) {
    throw new CheckoutError("session_failed", error instanceof Error ? error.message : "Unknown Stripe error");
  }
}

export interface CheckoutSummary {
  id: string;
  paid: boolean;
  status: string | null;
  listingSlug: string | null;
  amountTotal: number | null;
  email: string | null;
}

/** Looks up a session for the success page. Returns null if it can't be found or Stripe isn't configured. */
export async function getCheckoutSummary(sessionId: string): Promise<CheckoutSummary | null> {
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) return null;
  try {
    const session = await getClient().checkout.sessions.retrieve(sessionId);
    return {
      id: session.id,
      paid: session.payment_status === "paid",
      status: session.status,
      listingSlug: session.metadata?.listingSlug ?? null,
      amountTotal: session.amount_total === null ? null : session.amount_total / 100,
      email: session.customer_details?.email ?? null,
    };
  } catch {
    return null;
  }
}

/** Verifies a webhook signature and returns the parsed event. Throws if invalid. */
export function constructWebhookEvent(payload: string, signature: string): Stripe.Event {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new CheckoutError("checkout_unavailable", "STRIPE_WEBHOOK_SECRET is not set.");
  return getClient().webhooks.constructEvent(payload, signature, secret);
}
