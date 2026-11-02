import { NextResponse } from "next/server";
import { getListing } from "@/lib/listings";
import { CheckoutError, createListingCheckoutSession } from "@/lib/stripe";

type ErrorCode = "bad_request" | "listing_not_found" | "listing_sold" | "checkout_unavailable" | "session_failed";

function fail(code: ErrorCode, status: number) {
  return NextResponse.json({ code }, { status, headers: { "cache-control": "no-store" } });
}

/** POST { slug } → { url } for a Stripe Checkout session at the listing's asking price. */
export async function POST(request: Request) {
  let slug: unknown;
  try {
    ({ slug } = (await request.json()) as { slug?: unknown });
  } catch {
    return fail("bad_request", 400);
  }
  if (typeof slug !== "string" || !/^[a-z0-9-]{1,80}$/.test(slug)) return fail("bad_request", 400);

  const listing = getListing(slug);
  if (!listing) return fail("listing_not_found", 404);
  if (listing.status === "sold") return fail("listing_sold", 409);

  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || new URL(request.url).origin;

  try {
    const url = await createListingCheckoutSession(listing, origin);
    return NextResponse.json({ url }, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    if (error instanceof CheckoutError) {
      console.error(`[checkout] ${error.code}: ${error.message}`);
      return fail(error.code, error.code === "checkout_unavailable" ? 503 : 502);
    }
    console.error("[checkout] unexpected error", error);
    return fail("session_failed", 502);
  }
}
