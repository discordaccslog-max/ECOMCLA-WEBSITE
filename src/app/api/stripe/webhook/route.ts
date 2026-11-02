import { NextResponse } from "next/server";
import { constructWebhookEvent } from "@/lib/stripe";

/**
 * Stripe webhook. Verifies the signature, then handles completed checkouts.
 * Marking a listing as sold needs persistent storage: see README,
 * "After payment: marking listings sold".
 */
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const payload = await request.text();
  let event;
  try {
    event = constructWebhookEvent(payload, signature);
  } catch (error) {
    console.error("[webhook] rejected:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      if (session.payment_status === "paid") {
        // TODO(persistence): mark session.metadata.listingSlug as sold and notify the handover team.
        console.info(`[webhook] paid: listing=${session.metadata?.listingSlug} session=${session.id}`);
      }
      break;
    }
    case "checkout.session.expired":
      break;
  }
  return NextResponse.json({ received: true });
}
